import { Button } from "../ui/button";
import { Editor } from "@tiptap/react";

interface ColorPickerProps {
  editor: Editor;
  colorOptions: string[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ editor, colorOptions }) => (
  <div className="flex items-center space-x-2 animate-fade-in">
    <div className="flex gap-1">
      {colorOptions.map((color, index) => (
        <button
          key={`color-${index}-${color}`}
          className={`w-6 h-6 rounded-md border border-text/10 hover:scale-110 transition-transform`}
          style={{ backgroundColor: color }}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setColor(color).run();
          }}
        />
      ))}
    </div>
    <Button
      size="sm"
      variant="ghost"
      onClick={(e) => {
        e.preventDefault();
        editor.chain().focus().unsetColor().run();
      }}
      className={`text-text-muted hover:text-primary hover:bg-background-dark/10 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none`}
    >
      Reset
    </Button>
  </div>
);

