'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,  Trash2Icon, CopyIcon, UserCog, Check, Clipboard, LucideClipboardEdit} from "lucide-react"
import { jwtDecode } from "jwt-decode" 

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const btnDelete =  {
    icon: Trash2Icon
  }

const btnCopy = {
    icon: CopyIcon
}

const btnUpdate = {
  icon: UserCog
}


import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"

export type PanelStatus = {
  name: string,
  status: string
}

 export type Schedule = {
    _id: string
  studentName: string
  section: string
  manuscriptTitle: string
  adviser: string
  adviserStatus: "pending" | "approved" | "rejected"
  defenseDate: string
  room: string
  status: string,
  panelStatus: PanelStatus[]
}


const handleCopyUserId = (userId:string) => {
  navigator.clipboard.writeText(userId)
  toast("User ID Copied ✅ ")
}

//   const deleteUser = async (: string) => {
//   try {
//     const token = localStorage.getItem("token")
//     const res = await axios.delete(
//       `https://mss-express.onrender.com/api/users/delete-user/${userId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     console.log("Deleted:", res.data) 
//      toast("User deleted", {
//     description: "Selected user deleted  successfully✅.",
//     })
//   } catch (error) {
//     console.error("Failed to delete schedule:", error)
//   }
// }


export const columns: ColumnDef<Schedule>[] = [
      {
    accessorKey: "studentName",
    header: "Student Name",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "manuscriptTitle",
    header: "Manuscript title",
  },
   {
    accessorKey: "adviser",
    header: "Adviser",
  },
   {
    accessorKey: "adviserStatus",
    header: "Adviser Status",
  },
{
  accessorKey: "panelStatus",
  header: "Panel Status",
cell: ({ row }) => {
  const panelStatus = row.original.panelStatus

  const token = localStorage.getItem('token')
  let panelName = ''

  if (token) {
    const decoded: any = jwtDecode(token)
    panelName = decoded.name

  }
  

  const assignedPanel = panelStatus.find((panel: any) => panel.name === panelName)

  if (!assignedPanel) return <span>Not Assigned</span>

  return <span>{assignedPanel.status}</span>
}
,
}
,
   {
  accessorKey: "defenseDate",
  header: "Defense Date",
  cell: ({ row }) => {
    const date = new Date(row.original.defenseDate)
    const formatted = date.toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    return <span>{formatted}</span>
  },
},
   {
    accessorKey: "room",
    header: "Room",
  },
   {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const schedule = row.original
 
      return (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleCopyUserId(schedule._id)}
            >
              <btnCopy.icon /> Schedule ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LucideClipboardEdit />
            <Link href={`/dashboard/schedules/${schedule._id}`}>
                Update schedule
              </Link>

            </DropdownMenuItem>
            <DropdownMenuSeparator />
                
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

]

