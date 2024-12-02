'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'
import { FileText, Home, ChevronsLeft, ChevronsRight, BookOpen, Image } from 'lucide-react'
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
        "fixed inset-y-0 left-0 z-50 bg-background-dark text-text transition-all duration-300 ease-in-out flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      <nav className="flex-grow overflow-hidden">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={cn(
                  "flex items-center h-9 px-2 rounded-md transition-colors overflow-hidden",
                  pathname === item.href ? "text-primary bg-primary/10" : "text-text hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className={cn(
                  "ml-2 transition-all duration-300 ease-in-out whitespace-nowrap",
                  sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                )}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {mounted && (
        <div className="p-4 space-y-2">
          <ThemeToggle 
            compact={!sidebarOpen}
            className={cn(
              "flex items-center h-9 px-2 rounded-md transition-colors overflow-hidden",
              "text-text hover:text-primary hover:bg-primary/5 w-full justify-start"
            )}
          />
          <button
            onClick={toggleSidebar}
            className={cn(
              "flex items-center h-9 px-2 rounded-md transition-colors overflow-hidden w-full",
              "text-text hover:text-primary hover:bg-primary/5"
            )}
          >
            {sidebarOpen ? (
              <ChevronsLeft className="w-4 h-4 flex-shrink-0" />
            ) : (
              <ChevronsRight className="w-4 h-4 flex-shrink-0" />
            )}
            <span className={cn(
              "ml-2 transition-all duration-300 ease-in-out whitespace-nowrap",
              sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            )}>
              {sidebarOpen ? "Retract sidebar" : "Expand"}
            </span>
          </button>
        </div>
      )}
    </aside>
    <main className={cn(
      "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
      sidebarOpen ? "ml-64" : "ml-16"
    )}>
      <div className="p-6">
        {children}
      </div>
    </main>
  </div>
)
}

