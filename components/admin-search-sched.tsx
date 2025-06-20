"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "./ui/card"

const FormSchema = z.object({
  schedule: z.string().min(2, {
    message: "keyword must be at least 2 characters.",
  }),
})

export function ScheduleSearch() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      schedule: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <>
        <Card className="p-4 mt-10 w-5/6">
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex-col items-center justify-center space-y-6">
        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search for Schedule fields:</FormLabel>
              <FormControl>
                <Input placeholder="search.." {...field} />
              </FormControl>
              <FormDescription>
                Search using one of these fields eg. 'Student name', 'Section', 'Manuscript title'
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
      </form>
    </Form>
    </Card>
    </>
   
  )
}
