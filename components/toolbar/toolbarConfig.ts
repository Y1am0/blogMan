import { Editor } from '@tiptap/react';
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading, Quote, Code2Icon, ImageIcon, Youtube, Undo, Redo, AlignLeft, AlignCenter, AlignRight, AlignJustify, Pilcrow, Palette } from 'lucide-react';

export type ToolbarItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action?: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  ariaLabel: string;
};

export type ExpandableItem = ToolbarItem & {
  expandedContent: React.ComponentType<React.ReactNode>;
};

export const toolbarConfig: (ToolbarItem | ExpandableItem)[] = [
  {
    icon: Pilcrow,
    action: (editor: Editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor: Editor) => editor.isActive('paragraph'),
    ariaLabel: 'Paragraph',
  },
  {
    icon: Heading,
    action: () => {}, // This will be handled separately
    isActive: () => false, // This will be handled separately
    ariaLabel: 'Heading',
    expandedContent: () => null, // We'll implement this later
  },
  {
    icon: Bold,
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive('bold'),
    ariaLabel: 'Toggle Bold',
  },
  {
    icon: Italic,
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive('italic'),
    ariaLabel: 'Toggle Italic',
  },
  {
    icon: Strikethrough,
    action: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive('strike'),
    ariaLabel: 'Toggle Strikethrough',
  },
  {
    icon: Palette,
    action: () => {}, // This will be handled separately
    isActive: () => false, // This will be handled separately
    ariaLabel: 'Text Color',
    expandedContent: () => null, // We'll implement this later
  },
  {
    icon: List,
    action: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
    ariaLabel: 'Toggle Bullet List',
  },
  {
    icon: ListOrdered,
    action: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
    ariaLabel: 'Toggle Ordered List',
  },
  {
    icon: Quote,
    action: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor: Editor) => editor.isActive('blockquote'),
    ariaLabel: 'Toggle Blockquote',
  },
  {
    icon: Code2Icon,
    action: (editor: Editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor: Editor) => editor.isActive('codeBlock'),
    ariaLabel: 'Toggle Code Block',
  },
  {
    icon: AlignLeft,
    action: (editor: Editor) => editor.chain().focus().setTextAlign('left').run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'left' }),
    ariaLabel: 'Align Left',
  },
  {
    icon: AlignCenter,
    action: (editor: Editor) => editor.chain().focus().setTextAlign('center').run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'center' }),
    ariaLabel: 'Align Center',
  },
  {
    icon: AlignRight,
    action: (editor: Editor) => editor.chain().focus().setTextAlign('right').run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'right' }),
    ariaLabel: 'Align Right',
  },
  {
    icon: AlignJustify,
    action: (editor: Editor) => editor.chain().focus().setTextAlign('justify').run(),
    isActive: (editor: Editor) => editor.isActive({ textAlign: 'justify' }),
    ariaLabel: 'Justify',
  },
  {
    icon: ImageIcon,
    action: () => {}, // This will be handled separately
    isActive: () => false, // This will be handled separately
    ariaLabel: 'Add Image',
    expandedContent: () => null, // We'll implement this later
  },
  {
    icon: Youtube,
    action: () => {}, // This will be handled separately
    isActive: () => false, // This will be handled separately
    ariaLabel: 'Add YouTube Video',
    expandedContent: () => null, // We'll implement this later
  },
  {
    icon: Undo,
    action: (editor: Editor) => editor.chain().focus().undo().run(),
    isActive: () => false,
    ariaLabel: 'Undo',
  },
  {
    icon: Redo,
    action: (editor: Editor) => editor.chain().focus().redo().run(),
    isActive: () => false,
    ariaLabel: 'Redo',
  },
];

