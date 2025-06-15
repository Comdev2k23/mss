'use client'

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Wave from "react-wavify"

export default function Home() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
       
        <div className="flex justify-center gap-2 md:justify-start">
           
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
             <ModeToggle />
            </div>
            <h1 className="font-bold ml-2">MSS</h1>
          
        </div>

        {/* Auth Links */}
        <div className="flex flex-1 items-center justify-center">

          <div className="w-full space-y-4 text-center flex-col gap-5 justify-center">
            <div className="mt-[-150px]"> 
                  <h1 className="text-4xl font-bold">Manuscript Scheduling System</h1>
                   <h4 className="text-sm mt-1">"No More Missed Deadlines — Your Manuscript, On Track."</h4>
            </div>
      
          <div className="flex justify-center gap-4 mt-5">
              <Button className="" >
                  <Link href="/login">
            Login
            </Link>
              </Button>
            <br />
            <Button >
                  <Link href="/signup" >
              Sign up
            </Link>
              </Button>
          </div>
          </div>
        </div>
      </div>

     {/* Hero Image */}
<div className="relative hidden bg-muted lg:flex items-center justify-center">
  <div className="max-w-[500px] w-full ">
   <Image
  className="object-cover h-full w-full"
  src="/hero.png"
  alt="Hero"
  fill
  priority
    />
  </div>
</div>

    </div>
  )
}
