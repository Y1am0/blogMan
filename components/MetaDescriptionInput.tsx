import React from 'react';
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { AlertCircle } from 'lucide-react';

interface MetaDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const MetaDescriptionInput: React.FC<MetaDescriptionInputProps> = ({ value, onChange, error }) => {
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
        className={`w-full bg-background text-text border-border/20 hover:border-border focus:border-border transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 mt-1 ${error ? 'border-error' : ''}`}
      />
      {error && (
        <div className="flex items-center space-x-1 mt-1">
          <AlertCircle className="w-4 h-4 text-error" />
          <p className="text-error text-sm">{error}</p>
        </div>
      )}
      <p className="text-sm text-text-muted mt-1">{value.length}/160 characters</p>
    </div>
  );
};

export default MetaDescriptionInput;

