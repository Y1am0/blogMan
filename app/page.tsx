"use client";

import { useState } from "react";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import HowToUseModal from "@/components/HowToUseModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeProvider } from "next-themes";

export default function Home() {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className={`min-h-screen w-full bg-background-darkest flex flex-col items-center p-12 relative`}
      >
        <Editor />
        <div className="fixed bottom-4 right-4 flex space-x-2">
          <ThemeToggle />
          <Button
            onClick={() => setIsHowToUseOpen(true)}
            className={`bg-primary text-background hover:bg-primary-dark transition-colors duration-200`}
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            How to Use
          </Button>
        </div>
        <HowToUseModal isOpen={isHowToUseOpen} onClose={() => setIsHowToUseOpen(false)} />
      </div>
    </ThemeProvider>
  )
}

