import React from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, X } from 'lucide-react';

interface ExpandableSectionProps {
  isVisible: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  isVisible,
  placeholder,
  value,
  onChange,
  onSubmit,
  onCancel,
  onKeyDown,
}) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-center space-x-2 animate-fade-in">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className={`h-8 text-sm bg-background-dark text-text border border-border rounded-md focus:outline-none focus:border-primary`}
      />
      <Button
        size="sm"
        onClick={onSubmit}
        disabled={!value}
        className={`bg-transparent shadow-none text-text-muted hover:text-success focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={onCancel}
        className={`text-text-muted hover:text-error hover:bg-background-dark focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

