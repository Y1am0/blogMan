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
      className={`w-full h-[500px] p-4 bg-background text-text rounded-md border border-border/20 hover:border-border focus-within:border-border transition-colors focus:outline-none font-mono text-sm`}
    />
  );
};

export default HTMLEditor;

