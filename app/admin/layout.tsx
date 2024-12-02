'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import { FileText, Home, ChevronsLeft, BookOpen, Image } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const navItems = [
    { href: "/admin", icon: Home, label: "Dashboard" },
    { href: "/admin/articles", icon: BookOpen, label: "Articles" },
    { href: "/admin/create-post", icon: FileText, label: "Create Post" },
    { href: "/admin/media", icon: Image, label: "Media" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-background-dark text-text transition-all",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <nav className="flex flex-col h-full p-4">
          <div className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "flex items-center h-9 px-2 rounded-md transition-colors",
                  pathname === item.href ? "text-primary bg-primary/10" : "text-text hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className={cn(
                  "ml-2 whitespace-nowrap transition-all ",
                  sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
          {mounted && (
            <div className="mt-auto space-y-2">
              <ThemeToggle compact={!sidebarOpen} />
              <button
                onClick={toggleSidebar}
                className={cn(
                  "flex items-center h-9 px-2 rounded-md transition-colors w-full",
                  "text-text hover:text-primary hover:bg-primary/5"
                )}
              >
                <ChevronsLeft className={cn(
                  "w-4 h-4 flex-shrink-0 transition-transform ",
                  sidebarOpen ? "" : "rotate-180"
                )} />
                <span className={cn(
                  "ml-2 whitespace-nowrap",
                  sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}>
                  Retract sidebar
                </span>
              </button>
            </div>
          )}
        </nav>
      </aside>
      <main className={cn(
        "flex-1 overflow-y-auto transition-all ",
        sidebarOpen ? "ml-64" : "ml-16"
      )}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

