import {BrushCleaning } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertInbox() {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">

      <Alert>
        <BrushCleaning />
        <AlertTitle>
          No schedules ready for approval
        </AlertTitle>
      </Alert>
    </div>
  )
}
