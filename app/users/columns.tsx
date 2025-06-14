'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal,  Trash2Icon, CopyIcon, UserCog} from "lucide-react"
 
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

export type User = {
    _id: string,
    name: string,
    email: string,
    password: string,
    role: {
    name: string,
    role: "admin" | "adviser" | "student" | "panel"
    },
    createdAt?: string
     updatedAt?: string
}


const handleCopyUserId = (userId:string) => {
  navigator.clipboard.writeText(userId)
  toast("User ID Copied ✅ ")
}

  const deleteUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("token")
    const res = await axios.delete(
      `https://mss-express.onrender.com/api/users/delete-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log("Deleted:", res.data) 
     toast("User deleted", {
    description: "Selected user deleted  successfully✅.",
    })
  } catch (error) {
    console.error("Failed to delete schedule:", error)
  }
}


export const columns: ColumnDef<User>[] = [
      {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
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
              onClick={() => handleCopyUserId(user._id)}
            >
              <btnCopy.icon /> user ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <btnUpdate.icon />
            <Link href={`/users/${user._id}`}>
                Update user
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
                    This action cannot be undone. This will permanently delete this user
                    and remove this data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteUser(user._id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DropdownMenuSeparator />
                
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

]

