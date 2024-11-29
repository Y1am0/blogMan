import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-background text-text`}>
        <DialogHeader>
          <DialogTitle className={`text-primary`}>{title || 'Untitled'}</DialogTitle>
          <DialogDescription className={`text-text-muted`}>Preview of your blog post</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h1 className={`text-3xl font-bold mb-4 text-primary`}>{title || 'Untitled'}</h1>
          <div className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-text`} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;

