'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  compact?: boolean
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        "flex items-center h-9 px-2 rounded-md transition-colors w-full",
        "text-text hover:text-primary hover:bg-primary/5"
      )}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 flex-shrink-0" />
      ) : (
        <Moon className="w-4 h-4 flex-shrink-0" />
      )}
      <span className={cn(
        "ml-2 whitespace-nowrap",
        compact ? "opacity-0 w-0" : "opacity-100 w-auto"
      )}>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  )
}

