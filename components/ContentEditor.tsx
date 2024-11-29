import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import HTMLEditor from './HTMLEditor'
import SkeletonEditor from './SkeletonEditor'

const Tiptap = dynamic(() => import('./Tiptap'), {
  ssr: false,
  loading: () => <SkeletonEditor />
})

interface ContentEditorProps {
  content: string
  activeTab: string
  setActiveTab: (tab: string) => void
  onChange: (newContent: string) => void
}

export function ContentEditor({ content, activeTab, setActiveTab, onChange }: ContentEditorProps) {
  return (
    <div className="flex-grow min-h-0">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`bg-background-dark`}>
          <TabsTrigger value="visual" className={`data-[state=active]:bg-primary data-[state=active]:text-background`}>Visual Editor</TabsTrigger>
          <TabsTrigger value="html" className={`data-[state=active]:bg-primary data-[state=active]:text-background`}>HTML</TabsTrigger>
        </TabsList>
        <TabsContent value="visual">
          <Suspense fallback={<SkeletonEditor />}>
            <Tiptap
              content={content}
              onChange={onChange}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="html">
          <HTMLEditor
            content={content}
            onChange={onChange}
          />
        </TabsContent>
      </Tabs>
      <input type="hidden" name="content" />
    </div>
  )
}

