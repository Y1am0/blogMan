import React from 'react';
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface MetaDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MetaDescriptionInput: React.FC<MetaDescriptionInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="metaDescription" className={`text-sm font-medium text-text-muted`}>
        Meta Description
      </Label>
      <Textarea
        id="metaDescription"
        name="metaDescription"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter meta description"
        className={`w-full bg-background text-text border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 mt-1`}
      />
    </div>
  );
};

export default MetaDescriptionInput;

