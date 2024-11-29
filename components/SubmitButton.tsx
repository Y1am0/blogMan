import { useFormStatus } from 'react-dom'
import { Button } from "./ui/button"
import { FileCheck2 } from 'lucide-react'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      aria-disabled={pending}
      className={`bg-background-dark hover:bg-primary hover:text-background transition-colors w-full`}
    >
      <FileCheck2 className="w-4 h-4 mr-2" />
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  )
}

