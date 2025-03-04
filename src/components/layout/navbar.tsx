"use client";

import Link from "next/link";
import HamburgerMenu from "./hamburger";
import ProfilePhoto from "./profile-photo";
import logo from "/public/images/sahaj-logo.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky z-50 top-0 pt-[7px] pb-2 ps-4 pe-2 shadow bg-white ">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} role="app-logo" alt="app-logo" priority className="cursor-pointer h-12 w-min" />
        </Link>
        <div className="flex items-center h-8 gap-5">
          <HamburgerMenu />
          <ProfilePhoto />
        </div>
      </div>
    </nav>
  );
}