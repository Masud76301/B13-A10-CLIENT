"use client"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BiLocationPlus } from "react-icons/bi";
import { FaFacebook, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";

export default function Footer() {
    const pathName = usePathname();
    if(pathName.includes('dashboard')){
      return null;
    }
  return (
    <footer className="bg-linear-to-r from-[#1a1a1a] to-[#0f0f0f] text-gray-300 py-12 ">
      <div className="container mx-auto px-4">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10">

          {/* Logo + short text */}
          <div className="">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo1.png" alt="HireLoop Logo" width={30} height={30}/>
              <h2 className="text-white text-xl lg:text-2xl font-semibold">RecipeRoom</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              RecipeHub is a platform where food enthusiasts can create, share, discover, and manage recipes.

            </p>
          </div>

          {/* Company */}
          <div className="lg:pl-20">
            <h3 className="text-white text-lg font-semibold mb-4 ">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Essential Links */}
          <div className=" ">
            <h3 className="text-white text-lg font-semibold mb-4">Essential Link</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/browse-jobs" className="hover:text-white">Browse Recipe</a></li>
              <li><a href="/profile" className="hover:text-white">Add Recipe</a></li>
              <li><a href="/guides" className="hover:text-white">Guides</a></li>
              <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:pr-10">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex gap-2 items-center"><PiPhone/> +880 1700-000000</li>
              <li className="flex gap-2 items-center"> <MdMail/>hello@reciperoom.com</li>
              <li className="flex gap-2 items-center"><BiLocationPlus/> Chattogram,Bangladesh</li>
              
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} RecipeRoom. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-gray-400">
            <a href="#" className="hover:text-white">
              <FaXTwitter />

            </a>

            <a href="#" className="hover:text-white">
              <FaInstagram />

            </a>

            <a href="#" className="hover:text-white">
              <FaFacebookF />

            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}