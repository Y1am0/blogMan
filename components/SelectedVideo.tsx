import React, { useEffect, useState, useRef } from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'

const SelectedVideo: React.FC<NodeViewProps> = ({ node, selected, getPos, editor }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [width, setWidth] = useState(node.attrs.width);
  const [height, setHeight] = useState(node.attrs.height);
  const containerRef = useRef<HTMLDivElement>(null);

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
      editor.commands.updateMediaSelection(isNodeSelected, 'video');
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
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const aspectRatio = node.attrs.width / node.attrs.height;
      const containerWidth = containerRef.current.clientWidth;
      const newWidth = Math.min(node.attrs.width, containerWidth);
      const newHeight = newWidth / aspectRatio;

      setWidth(newWidth);
      setHeight(newHeight);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [node.attrs.width, node.attrs.height]);

  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(node.attrs.src);

  return (
    <NodeViewWrapper className="relative inline-block w-full" ref={containerRef}>
      <div
        className={`relative ${isSelected ? `ring-2 ring-primary` : ''}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              width={width}
              height={height}
              style={{
                width: '100%',
                height: '100%',
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className={`w-full h-full bg-background-dark flex items-center justify-center text-text-muted`}>
              Invalid YouTube URL
            </div>
          )}
        </div>
        {isSelected && (
          <div className="absolute bottom-4 right-2 flex space-x-2 z-10">
            <div className={`bg-background-dark bg-opacity-50 text-text px-2 py-1 text-xs rounded`}>
              Selected
            </div>
            <div className={`bg-background-dark bg-opacity-50 text-text px-2 py-1 text-xs rounded`}>
              {`${node.attrs.width}x${node.attrs.height}`}
            </div>
          </div>
        )}
        {!isSelected && (
          <div className={`absolute bottom-6 right-2 bg-background-dark bg-opacity-50 hover:bg-primary hover:text-background transition-colors duration-200 hover:bg-opacity-100 text-text text-xs px-2 py-1 border border-primary rounded z-10`}>
            Click here to select video
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default SelectedVideo;