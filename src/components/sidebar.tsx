import React from 'react';
import Image from 'next/image';

const Sidebar = () => {
  return (
    <div
      className="group flex absolute top-0 left-0 h-screen w-[50px] hover:w-[150px] flex-col overflow-y-hidden bg-white shadow-md duration-300 ease-linear lg:static lg:translate-x-0"
    >
      <div className="mt-5 ml-4 space-y-4">
        <div className=" flex flex-row  items-center mb-6">
          <Image
            className="dark:invert mr-2"
            src="/vercel.svg"
            alt="Next.js logo"
            width={15}
            height={15}
            priority
          />
          <span className="text-black opacity-0 group-hover:opacity-100 duration-300 text-sm">Kasirku</span>
        </div>
        <div className="flex flex-row items-center">
          <Image
            className="dark mr-2"
            src="/file.svg"
            alt="File icon"
            width={15}
            height={15}
            priority
          />
          <span className="text-black opacity-0 group-hover:opacity-100 duration-300 text-sm">Home</span>
        </div>
        <div className="flex flex-row items-center">
          <Image
            className="dark mr-2"
            src="/Globe.svg"
            alt="Globe icon"
            width={15}
            height={15}
            priority
          />
          <span className="text-black opacity-0 group-hover:opacity-100 duration-300 text-sm">Data</span>
        </div>
        <div className="flex flex-row items-center">
          <Image
            className="dark mr-2"
            src="/window.svg"
            alt="Window icon"
            width={15}
            height={15}
            priority
          />
          <span className="text-black opacity-0 group-hover:opacity-100 duration-300 text-sm">Employee</span>
        </div>
        <div className="flex flex-row items-center">
          <Image
            className="dark mr-2"
            src="/file.svg"
            alt="File icon"
            width={15}
            height={15}
            priority
          />
          <span className="text-black opacity-0 group-hover:opacity-100 duration-300 text-sm">Inventory</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


