'useClient'

import Link from "next/link";

export default function Home() {
  return (
        <div className="mx-auto flex-col h-screen w-full">
          <div className="flex mt-[200px] ml-[87px]">
            <h1 className="text-4xl">Manuscript Scheduling System</h1>
          </div>
          <div className="text-xl flex gap-12 ml-[87px] mt-5  w-[500px]  justify-center ">
            <Link href={'/login'} className="py-2 px-4">Login</Link>
            <Link href={'/signup'} className="bg-[#D9D9D9] py-2 px-4 rounded-md">Sign Up</Link>
          </div>
        </div>
  );
}
