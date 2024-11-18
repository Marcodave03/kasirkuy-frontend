import Image from "next/image";
import Navbar from "../components/navbar";
import { Calendar, ChartPie, Coins, HandCoins, House, Inbox, Users } from "lucide-react";
export default function Home() {

  const feature = [
    {
      title: "Analytics",
      icon: ChartPie,
    },
    {
      title: "Financials",
      icon: HandCoins,
    },
    {
      title: "Calendar",
      icon: Calendar,
    },
    {
      title: "Home",
      icon: House,
    },
    {
      title: "Product",
      icon: Inbox,
    },
    {
      title: "Transaction",
      icon: Coins,
    },
    {
      title: "Customer",
      icon: Users,
    },
    {
      title: "Customer",
      icon: Users,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="dark:bg-black bg-white mt-10">
        <div className="pl-32 h-auto flex dark:bg-black light:bg-white">
          <div className="grid grid-cols-2 text-black">
            <div className="flex flex-col gap-5 py-32 mr-20">
              <div className="text-5xl font-medium text-black dark:text-white">
                Make Things Easy Yow Yow{" "}
                <span className="text-cornflower-blue-400 text-black dark:text-white">
                  Dengan
                </span>
                <span className="text-cornflower-blue-500 text-black dark:text-white">
                  Kasir Kuy :D
                </span>
              </div>
              <div className="text-base font-medium text-black dark:text-white">
                Make your business Impactful with expert anytime, anywhere
              </div>
              <button className="bg-cornflower-blue-500 w-24 p-2 text-center rounded-lg dark:bg-white bg-black dark:text-black text-white   font-medium text-sm">
                JOIN US
              </button>
            </div>
            <div className="flex justify-end mr-10">
              <Image
                src="/assets/b1.png"
                alt="Light mode image"
                width={600}
                height={300}
                className="block dark:hidden"
              />
              <Image
                src="/assets/b3.png"
                alt="Dark mode image"
                width={600}
                height={300}
                className="hidden dark:block"
              />
            </div>
          </div>
        </div>

        <div className="px-32 pb-16 ">
          <div className="py-8 text-center font-semibold text-2xl">Our Feature</div>
          <div className="grid grid-cols-4 text-black gap-4">
            {feature.map((item, index) => (
              <div 
                key={index}
                className="rounded-xl gap-2 bg-black border-2 dark:border-white p-2 flex flex-row items-center space-x-5 justify-bewteen"
              >
                  <div className="text-white text-2xl ml-4">
                    <item.icon />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-md text-white">200 Courses</p>
                  </div>
              </div>
            ))}
          </div>
        </div>


        <div className="px-32 py-16 bg-black border-t-2 border-b-2 border-white dark:border-gray-200">
          <div className="grid grid-cols-10 text-black gap-4">
            <div className="flex flex-col text-start gap-4 col-span-4 pr-4">
              <p className="text-2xl font-medium text-white">
                Start Your Business with 2 Entrepreneur around the Binus
              </p>
            </div>

            <div className=" ml-10 flex flex-col text-start gap-4 col-span-2 justify-center">
              <p className="text-white text-2xl font-semibold">6.3k </p>
              <p className="text-gray-300 text-xs">Panda </p>
            </div>

            <div className="flex flex-col text-start gap-4 col-span-2 justify-center">
              <p className="text-white text-2xl font-semibold">6.3k </p>
              <p className="text-gray-300 text-xs">Panda </p>
            </div>

            <div className="flex flex-col text-start gap-4 col-span-2 justify-center">
              <p className="text-white text-2xl font-semibold">6.3k </p>
              <p className="text-gray-300 text-xs">Panda </p>
            </div>

          </div>
        </div>

        {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 text-black">
              Get started by editing{" "}
              <code className="bg-gray-950/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="text-black">Save and see your changes instantly.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm text-white sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid bg-black transition-colors flex items-center justify-center hover:bg-[#858585] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main> */}
        <footer className="bg-black pt-12 pb-3 mt-36">
          <div className="w-full mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-white">
              <div className="col-span-2">
                <h2 className="text-2xl font-bold">IgniteFuture</h2>
                <p className="mt-4 text-sm">
                  Aliquam rhoncus ligula est, non pulvinar elit convallis nec.
                  Donec mattis odio at.
                </p>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="text-white">
                    <i className="fab fa-facebook-square fa-2x"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                  <a href="#" className="text-white">
                    <i className="fab fa-youtube fa-2x"></i>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-bold">Top 4 Category</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Development
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Finance & Accounting
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Design
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Business
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Become Instructor
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Career
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Download Our App</h3>
                <div className="mt-4 space-y-4">
                  <a
                    href="#"
                    className="bg-black text-white py-2 px-4 inline-flex items-center rounded"
                  >
                    <i className="fab fa-apple mr-2"></i>
                    App Store
                  </a>
                  <a
                    href="#"
                    className="bg-black text-white py-2 px-4 inline-flex items-center rounded"
                  >
                    <i className="fab fa-google-play mr-2"></i>
                    Play Store
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center text-sm text-white pt-6 font-semibold">
              © 2024 - IgniteFuture. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
