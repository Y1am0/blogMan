import React from 'react';

interface HTMLEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

const HTMLEditor: React.FC<HTMLEditorProps> = ({ content, onChange }) => {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-[500px] p-4 bg-background text-text border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm`}
    />
  );
};

export default HTMLEditor;

