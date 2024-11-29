import React from 'react';
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ExcerptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

const ExcerptInput: React.FC<ExcerptInputProps> = ({ value, onChange, maxLength = 120 }) => {
  return (
    <div>
      <Label htmlFor="excerpt" className={`text-sm font-medium text-text-muted`}>
        Excerpt
      </Label>
      <Textarea
        id="excerpt"
        name="excerpt"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={`Enter excerpt (max ${maxLength} characters)`}
        maxLength={maxLength}
        className={`w-full bg-background text-text border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 mt-1`}
      />
      <p className={`text-sm text-text-muted mt-1`}>{value.length}/{maxLength} characters</p>
    </div>
  );
};

export default ExcerptInput;

