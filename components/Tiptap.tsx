import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/react";
import { Toolbar } from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SelectedImage from "./SelectedImage";
import SelectedVideo from "./SelectedVideo";
import { Extension } from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

const lowlight = createLowlight();
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (richText: string) => void;
}) => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isVideoSelected, setIsVideoSelected] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "font-bold",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "ml-4",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 pl-2 italic m-2",
        },
      }),
      Image.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: null,
              renderHTML: (attributes) => {
                if (!attributes.width) {
                  return {};
                }
                return { width: attributes.width };
              },
            },
            height: {
              default: null,
              renderHTML: (attributes) => {
                if (!attributes.height) {
                  return {};
                }
                return { height: attributes.height };
              },
            },
          };
        },
        addNodeView() {
          return ReactNodeViewRenderer(SelectedImage);
        },
      }).configure({
        inline: true,
        allowBase64: true,
      }),
      Youtube.extend({
        addNodeView() {
          return ReactNodeViewRenderer(SelectedVideo);
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: 640,
              renderHTML: (attributes) => {
                if (!attributes.width) {
                  return {};
                }
                return { width: attributes.width };
              },
            },
            height: {
              default: 360,
              renderHTML: (attributes) => {
                if (!attributes.height) {
                  return {};
                }
                return { height: attributes.height };
              },
            },
          };
        },
      }).configure({
        inline: false,
        allowFullscreen: true,
        controls: true,
        nocookie: true,
        modestBranding: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Extension.create({
        name: "updateMediaSelection",
        addCommands() {
          return {
            updateMediaSelection:
              (isSelected: boolean, mediaType: "image" | "video") => () => {
                if (mediaType === "image") {
                  setIsImageSelected(isSelected);
                } else if (mediaType === "video") {
                  setIsVideoSelected(isSelected);
                }
                return true;
              },
          };
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: `h-[500px] bg-background text-text focus:outline-none p-4 [&_img]:my-4 [&_iframe]:my-4 overflow-y-auto`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editable: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (!editor) return;

    const updateMediaSelection = () => {
      const isImage = editor.isActive("image");
      const isVideo = editor.isActive("youtube");
      setIsImageSelected(isImage);
      setIsVideoSelected(isVideo);
    };

    editor.on("selectionUpdate", updateMediaSelection);
    editor.on("update", updateMediaSelection);

    return () => {
      editor.off("selectionUpdate", updateMediaSelection);
      editor.off("update", updateMediaSelection);
    };
  }, [editor]);

  const editorContainerClasses = `mt-2 border border-border/20 flex-grow overflow-hidden rounded-md ${
    isImageSelected || isVideoSelected
      ? ""
      : `hover:border-border focus-within:border-border transition-colors`
  }`;

  return (
    <div className="flex flex-col h-[calc(100%+500px)]">
      <Toolbar
        editor={editor}
        isImageSelected={isImageSelected}
        isVideoSelected={isVideoSelected}
      />
      <div className={editorContainerClasses}>
        <EditorContent className="h-full" editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
