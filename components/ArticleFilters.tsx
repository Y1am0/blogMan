import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ArticleFiltersProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({ onSearchChange, onSortChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <Input
        placeholder="Search articles by title, tags, or keywords..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-grow"
      />
      <Select onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className='bg-background/60 backdrop-blur-sm'>
          <SelectItem value="date-desc">Newest first</SelectItem>
          <SelectItem value="date-asc">Oldest first</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleFilters;

