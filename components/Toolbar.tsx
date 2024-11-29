"use client";

import { useState, useCallback, useEffect } from "react";
import { type Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { toolbarConfig, ExpandableItem } from "@/components/toolbar/toolbarConfig";
import { ColorPicker } from "@/components/toolbar/ColorPicker";
import { ExpandableSection } from "@/components/toolbar/ExpandableSection";
import { blogTextColorOptions } from '@/lib/BlogTextColorOptions'

type Props = {
  editor: Editor | null;
  isImageSelected: boolean;
  isVideoSelected: boolean;
};

const MAX_WIDTH = 1500;
const MIN_WIDTH = 150;

const useMediaResize = (editor: Editor | null, mediaType: 'image' | 'youtube') => {
  return useCallback((value: number[]) => {
    if (!editor) return;
    const size = value[0];
    const { selection } = editor.state;
    const mediaNode = editor.getAttributes(mediaType);
    if (mediaNode.src) {
      const originalWidth = mediaNode.originalWidth || MAX_WIDTH;
      const aspectRatio = mediaNode.width / mediaNode.height;
      
      const maxWidth = Math.min(originalWidth, MAX_WIDTH);
      const range = maxWidth - MIN_WIDTH;
      const newWidth = Math.round(MIN_WIDTH + (range * size / 100));
      const newHeight = Math.round(newWidth / aspectRatio);

      editor
        .chain()
        .focus()
        .updateAttributes(mediaType, { width: newWidth, height: newHeight })
        .setNodeSelection(selection.from)
        .run();
    }
  }, [editor, mediaType]);
};

export const Toolbar = ({ editor, isImageSelected, isVideoSelected }: Props) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imageSize, setImageSize] = useState(100);
  const [videoSize, setVideoSize] = useState(100);
  const [originalImageWidth, setOriginalImageWidth] = useState(0);
  const [originalVideoWidth, setOriginalVideoWidth] = useState(0);
  const handleImageResize = useMediaResize(editor, 'image');
  const handleVideoResize = useMediaResize(editor, 'youtube');

  useEffect(() => {
    if (!editor) return;

    if (isImageSelected) {
      const imageNode = editor.getAttributes('image');
      if (imageNode.src) {
        const originalWidth = imageNode.originalWidth || MAX_WIDTH;
        setOriginalImageWidth(Math.min(originalWidth, MAX_WIDTH));
        const currentWidth = imageNode.width || originalWidth;
        const range = Math.min(originalWidth, MAX_WIDTH) - MIN_WIDTH;
        const newSize = Math.round(((currentWidth - MIN_WIDTH) / range) * 100);
        setImageSize(newSize);
      }
    }

    if (isVideoSelected) {
      const videoNode = editor.getAttributes('youtube');
      if (videoNode.src) {
        const originalWidth = videoNode.originalWidth || MAX_WIDTH;
        setOriginalVideoWidth(Math.min(originalWidth, MAX_WIDTH));
        const currentWidth = videoNode.width || originalWidth;
        const range = Math.min(originalWidth, MAX_WIDTH) - MIN_WIDTH;
        const newSize = Math.round(((currentWidth - MIN_WIDTH) / range) * 100);
        setVideoSize(newSize);
      }
    }
  }, [editor, isImageSelected, isVideoSelected]);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setExpandedItem(null);
    }
  };

  const addYoutubeVideo = () => {
    if (youtubeUrl) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl });
      setYoutubeUrl("");
      setExpandedItem(null);
    }
  };

  const handleImageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addImage();
    } else if (e.key === "Escape") {
      setExpandedItem(null);
      setImageUrl("");
    }
  };

  const handleYoutubeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addYoutubeVideo();
    } else if (e.key === "Escape") {
      setExpandedItem(null);
      setYoutubeUrl("");
    }
  };

  const renderExpandedContent = (item: ExpandableItem) => {
    switch (item.ariaLabel) {
      case 'Heading':
        return (
          <div className="flex items-center space-x-2 animate-fade-in">
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <Button
                key={level}
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                    .run();
                }}
                className={`p-2 hover:bg-background-dark hover:text-primary rounded transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 ${
                  editor.isActive("heading", { level })
                    ? `bg-primary text-background`
                    : `text-text`
                } rounded-md`}
              >
                H{level}
              </Button>
            ))}
          </div>
        );
      case 'Text Color':
        return <ColorPicker editor={editor} colorOptions={blogTextColorOptions} />;
      case 'Add Image':
        return (
          <ExpandableSection
            isVisible={true}
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={setImageUrl}
            onSubmit={addImage}
            onCancel={() => {
              setExpandedItem(null);
              setImageUrl("");
            }}
            onKeyDown={handleImageKeyDown}
          />
        );
      case 'Add YouTube Video':
        return (
          <ExpandableSection
            isVisible={true}
            placeholder="Enter YouTube URL"
            value={youtubeUrl}
            onChange={setYoutubeUrl}
            onSubmit={addYoutubeVideo}
            onCancel={() => {
              setExpandedItem(null);
              setYoutubeUrl("");
            }}
            onKeyDown={handleYoutubeKeyDown}
          />
        );
      default:
        return null;
    }
  };

  const calculateActualWidth = (sliderValue: number, originalWidth: number) => {
    const range = originalWidth - MIN_WIDTH;
    return Math.round(MIN_WIDTH + (range * sliderValue / 100));
  };

  return (
    <div className={`border border-border bg-background rounded-md p-2 flex flex-col transition-all duration-300 ease-in-out`}>
      <div className="flex flex-wrap gap-1 items-center [&>button]:p-2">
        {toolbarConfig.map((item, index) => (
          <Toggle
            key={index}
            size="sm"
            pressed={item.isActive ? item.isActive(editor) : false}
            onPressedChange={() => {
              if (!isImageSelected && !isVideoSelected) {
                if ('expandedContent' in item) {
                  setExpandedItem(expandedItem === item.ariaLabel ? null : item.ariaLabel);
                } else if (item.action) {
                  item.action(editor);
                }
              }
            }}
            aria-label={item.ariaLabel}
            disabled={isImageSelected || isVideoSelected}
            className={`
              data-[state=on]:bg-primary 
              data-[state=on]:text-background
              text-text
              hover:bg-background-dark
              hover:text-primary
              transition duration-200 
              bg-transparent
              ${(isImageSelected || isVideoSelected) ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
          </Toggle>
        ))}
      </div>
      <div
        className="space-y-2 overflow-hidden transition-all duration-300 ease-in-out px-2"
        style={{
          maxHeight: expandedItem || isImageSelected || isVideoSelected ? "50px" : "0",
          opacity: expandedItem || isImageSelected || isVideoSelected ? 1 : 0,
          marginTop: expandedItem || isImageSelected || isVideoSelected ? "0.5rem" : "0",
        }}
      >
        {expandedItem && renderExpandedContent(toolbarConfig.find(item => item.ariaLabel === expandedItem) as ExpandableItem)}
        {isImageSelected && (
          <div className="w-full px-2 py-2 flex items-center space-x-4">
            <Slider
              value={[imageSize]}
              onValueChange={(value) => {
                setImageSize(value[0]);
                handleImageResize(value);
              }}
              max={100}
              min={0}
              step={1}
              className="flex-grow"
            />
            <div className={`text-sm text-text min-w-[80px] text-center`}>
              {calculateActualWidth(imageSize, originalImageWidth)}px
            </div>
          </div>
        )}
        {isVideoSelected && (
          <div className="w-full px-2 py-2 flex items-center space-x-4">
            <Slider
              value={[videoSize]}
              onValueChange={(value) => {
                setVideoSize(value[0]);
                handleVideoResize(value);
              }}
              max={100}
              min={0}
              step={1}
              className="flex-grow"
            />
            <div className={`text-sm text-text min-w-[80px] text-center`}>
              {calculateActualWidth(videoSize, originalVideoWidth)}px
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

