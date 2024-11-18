import Link from "next/link";
import React from "react";
// import Image from "next/image";
import { DarkTheme } from "./darktheme";
import {
  PawPrint
} from "lucide-react";

const Navbar = () => {
  return (
    <div className="light:bg-white dark:bg-black p-5 top-0 left-0 fixed w-[100vw] bg-opacity-70 backdrop-blur-md">
      <div className="flex justify-between">
      <div className="flex justify-between">
        <div className="flex flex-row">
          <div className="items-center flex flex-row">
            <div className="font-bold text-xl mr-2">
              KasirKuy !
            </div>
            <div>
              <PawPrint className="light:text-black dark:text-white"/>
            </div>
          </div>

            {/* <Image
            className="dark"
            src="/next.svg"
            alt="Next.js logo"
            width={80}
            height={38}
            priority
            /> */}
        </div>
        
      </div>
      
        <div className="flex flex-row space-x-4">
          <div className="items-center flex flex-row space-x-8">
            <div className="light:text-black dark:text-white"><Link href="/dashboard">Dashboard</Link></div>
            <div className="light:text-black dark:text-white"><Link href="/login">Login</Link></div>
            <div className="light:text-black dark:text-white"><Link href="/register">Register</Link></div>
            <DarkTheme/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
