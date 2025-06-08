import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,} from "@/components/ui/form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { signupFormSchema } from "@/lib/form.schemas"
import Link from "next/link"


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const form = useForm<z.infer<typeof signupFormSchema>>({
            resolver: zodResolver(signupFormSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
            }
    })

    const onSubmit = (values: z.infer<typeof signupFormSchema>) => {

        console.log(values)
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
           Fill up all fields to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type='text' placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem> )} />
              </div>
              <div className="grid gap-3">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type='email' placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem> )} />
              </div>
              <div className="grid gap-3">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem> )} />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
             Already have an account?{" "}
            <Link href={'/login'}  className="underline underline-offset-4">Login</Link>
            </div>
          </form>
            </Form>
        </CardContent>
      </Card>
    </div>
  )
}
