"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@heroui/react";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";
import { ProfileDropdown } from "./ProfileDropdown";
import { ThemeSwitch } from "./ThemeSwitch";
import { usePathname } from "next/navigation";
// import { signOut, useSession } from "../lib/auth-client";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const pathName = usePathname();
  if(pathName.includes('dashboard')){
    return null;
  }
  if(pathName.includes('success')){
    return null;
  }

  // const handleSignOut = async () => {
  //   await signOut();

  // }

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Recipes",
      href: "/recipes",
    }
  ];

  const dashboardLinks = {
    user: '/dashboard/user',
    admin: '/dashboard/admin'

  }

  if (user?.email) {
    navLinks.push(
      {
        label: "Dashboard",
        href: dashboardLinks[user?.role || 'user']
      }
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo1.png" alt="recipe-room Logo" width={30} height={30} />

          <div className="hidden leading-none sm:block">
            <h1 className="text-lg font-bold text-white">
              RecipeRoom
            </h1>
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <div className="hidden items-center  gap-6 md:flex">
            {/* Nav Links */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Auth Links */}
            <div className="flex items-center gap-4">
              {
                user ?
                  (<div className=' text-white '>
                    {/* <Link href="/">
                      <Avatar size="sm">
                        <AvatarImage src={user?.image} referrerPolicy='no-referrer' />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link> */}
                    <ProfileDropdown user={user}></ProfileDropdown>
                  </div>)
                  :
                  (<div className="flex gap-5 items-center">
                    <Link
                      href="/auth/signin"
                      className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                    >
                      Sign In
                    </Link>
                    <Link href="/auth/signup">
                      <Button
                        radius="lg"
                        className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>)}

                <div className="hidden lg:block">
                  <ThemeSwitch></ThemeSwitch>
                </div>
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden">
          <div className="space-y-3 px-4 py-6">
            {/* Nav Links */}
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                {
                user ?
                  (<div className=' text-white '>
                    {/* <Link href="/">
                      <Avatar size="sm">
                        <AvatarImage src={user?.image} referrerPolicy='no-referrer' />
                        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link> */}
                    <ProfileDropdown user={user}></ProfileDropdown>
                  </div>)
                  :
                  (<div className="flex gap-5 items-center">
                    <Link
                      href="/auth/signin"
                      className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                    >
                      Sign In
                    </Link>
                    <Link href="/auth/signup">
                      <Button
                        radius="lg"
                        className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}