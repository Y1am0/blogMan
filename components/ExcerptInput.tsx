import React from 'react';
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { AlertCircle } from 'lucide-react';

interface ExcerptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  error?: string | null;
}

const ExcerptInput: React.FC<ExcerptInputProps> = ({ value, onChange, maxLength = 120, error }) => {
  return (
    <div>
      <Label htmlFor="excerpt" className="text-sm font-medium text-text-muted">
        Excerpt
      </Label>
      <Textarea
        id="excerpt"
        name="excerpt"
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder={`Enter excerpt (max ${maxLength} characters)`}
        maxLength={maxLength}
        className={`w-full bg-background text-text border-border focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 mt-1 ${error ? 'border-error' : ''}`}
      />
      <div className="flex justify-between mt-1">
        <p className="text-sm text-text-muted">{value.length}/{maxLength} characters</p>
        {error && (
          <div className="flex items-center space-x-1">
            <AlertCircle className="w-4 h-4 text-error" />
            <p className="text-error text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcerptInput;

