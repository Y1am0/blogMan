import React, { useEffect, useState } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'

const MAX_WIDTH = 1500;

const SelectedImage: React.FC<NodeViewProps> = ({ node, selected, getPos, editor }) => {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  useEffect(() => {
    const updateSelect = () => {
      const { from, to } = editor.state.selection;
      const pos = getPos();
      const isNodeSelected = pos >= from && pos + node.nodeSize <= to;
      setIsSelected(isNodeSelected);

      // Inform the parent Tiptap component about the selection state
      editor.commands.updateMediaSelection(isNodeSelected, 'image');
    };

    editor.on('selectionUpdate', updateSelect);
    editor.on('focus', updateSelect);
    editor.on('blur', () => setIsSelected(false));

    return () => {
      editor.off('selectionUpdate', updateSelect);
      editor.off('focus', updateSelect);
      editor.off('blur');
    };
  }, [editor, getPos, node.nodeSize]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      let newWidth = img.naturalWidth;
      let newHeight = img.naturalHeight;

      if (newWidth > MAX_WIDTH) {
        const aspectRatio = newWidth / newHeight;
        newWidth = MAX_WIDTH;
        newHeight = Math.round(newWidth / aspectRatio);
      }

      if (newWidth !== node.attrs.width || newHeight !== node.attrs.height) {
        editor.chain().setNodeSelection(getPos()).updateAttributes('image', {
          width: newWidth,
          height: newHeight,
          originalWidth: img.naturalWidth,
          originalHeight: img.naturalHeight
        }).run();
      }
    };
    img.src = node.attrs.src;
  }, [node.attrs.src, editor, getPos]);

  return (
    <NodeViewWrapper className="relative inline-block">
      <img
        src={node.attrs.src}
        alt={node.attrs.alt}
        width={node.attrs.width}
        height={node.attrs.height}
        className={`max-w-full h-auto ${isSelected ? `ring-2 ring-primary` : ''}`}
      />
      {isSelected && (
        <div className="absolute bottom-6 right-2 flex space-x-2">
          <div className={`bg-background-dark bg-opacity-50 text-text px-2 py-1 text-xs rounded`}>
            Selected
          </div>
          <div className={`bg-background-dark bg-opacity-50 text-text px-2 py-1 text-xs rounded`}>
            {node.attrs.width && node.attrs.height 
              ? `${node.attrs.width}x${node.attrs.height}`
              : 'Original size'}
          </div>
        </div>
      )}
    </NodeViewWrapper>
  )
}

export default SelectedImage

