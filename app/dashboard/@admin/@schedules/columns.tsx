"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Schedule } from "@/lib/form.schemas"
import { MoreHorizontal,  Trash2Icon, CopyIcon, FileSliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PopoverDemo } from "@/components/admin-view-schedules"
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


import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"

const btnDelete =  {
    icon: Trash2Icon
  }

const btnCopy = {
    icon: CopyIcon
}

const btnUpdate = {
  icon: FileSliders
}

const handleCopySchedId = (schedId:string) => {
  navigator.clipboard.writeText(schedId)
  toast("Schedule ID Copied ✅ ")
}

  const deleteSchedule = async (schedId: string) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.delete(
      `https://mss-express.onrender.com/api/schedules/admin/delete-schedule/${schedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log("Deleted:", res.data)
     toast("Schedule deleted", {
    description: "Selected schedule deleted  successfully✅.",
    })
    setTimeout(()=> {
      location.reload()
    }, 1500)
  } catch (error) {
    console.error("Failed to delete schedule:", error)
  }
}

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
    header: "Title",
  },
  {
    accessorKey: "adviser",
    header: "Adviser",
  },
  {
    accessorKey: "defenseDate",
    header: "Defense Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("defenseDate"))
      return date.toLocaleString("en-PH", {
        dateStyle: "medium",
        timeStyle: "short",
      })
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
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleCopySchedId(schedule._id)}
            >
              <btnCopy.icon /> schedule ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <btnUpdate.icon />
            <Link href={`/schedules/${schedule._id}`}>
                Update Schedule
              </Link>

            </DropdownMenuItem>
              <AlertDialog>
              <AlertDialogTrigger className="text-sm p-2 flex gap-2 items-center hover:bg-sidebar-accent w-full rounded-lg text-red-700 ">
                <btnDelete.icon className="size-4"/>
                Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this schedule
                    and remove this data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteSchedule(schedule._id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuSeparator />
                <PopoverDemo schedId={schedule._id}  />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
