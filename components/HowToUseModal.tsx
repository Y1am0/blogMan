import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-background text-text`}>
        <DialogHeader>
          <DialogTitle className={`text-primary`}>How to Use the Blog Creator</DialogTitle>
          <DialogDescription className={`text-text-muted`}>Learn how to create and manage your blog posts</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>1. Title and Slug</h3>
            <p>Enter your blog post title. The slug will be automatically generated, but you can customize it by clicking the lock icon.</p>
          </section>
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>2. Content Editor</h3>
            <p>Use the visual editor to write and format your content. You can switch to HTML mode for advanced editing.</p>
          </section>
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>3. Meta Description and Excerpt</h3>
            <p>Add a meta description for SEO purposes. The excerpt is auto-generated but can be customized.</p>
          </section>
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>4. Featured Image</h3>
            <p>Upload a featured image for your blog post by dragging and dropping or clicking to select.</p>
          </section>
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>5. Publish Date</h3>
            <p>Set the publish date for your blog post using the calendar picker.</p>
          </section>
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>6. Tags and Keywords</h3>
            <p>Add relevant tags and keywords to categorize and improve the SEO of your post.</p>
          </section>
          <section>
            <h3 className={`text-lg font-semibold text-primary`}>7. Preview and Submit</h3>
            <p>Use the Preview button to see how your post will look. When you&apos;re ready, click Submit to publish your blog post.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowToUseModal;

