import React, { useState, KeyboardEvent } from 'react';
import { Input } from './ui/input';
import { X } from 'lucide-react';

interface TagInputProps {
  id: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
}

const TagInput: React.FC<TagInputProps> = ({ id, tags, setTags, placeholder }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={`bg-background focus-within:border-transparent rounded-md p-2 flex flex-wrap items-center transition-colors duration-200`}>
      {tags.map(tag => (
        <div key={tag} className={`bg-primary text-background px-2 py-1 rounded-md m-1 flex items-center`}>
          <span>{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className={`ml-2 text-background hover:text-text transition-colors`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <Input
        id={id}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        className={`flex-grow border-none bg-transparent text-text placeholder-text-muted focus-visible:ring-0 focus-visible:ring-offset-0`}
      />
    </div>
  );
};

export default TagInput;

