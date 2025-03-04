"use client";
import Image from "next/image";
import menu from "/public/images/menu.svg";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import HamburgerMenuItem from "./hamburgerMenuItem";

export default function HamburgerMenu() {
  const overlayPanel = useRef<OverlayPanel>(null);
  return (
    <>
      <Image
        src={menu}
        height={50}
        width={50}
        alt="hamburger-menu-icon"
        role="hamburger-menu"
        priority
        className="cursor-pointer h-6 w-min"
        onClick={(e) => overlayPanel.current?.toggle(e)}
      />
      <OverlayPanel
        ref={overlayPanel}
        pt={{
          content: { className: "p-4" },
        }}
        className="bg-white rounded-[1rem] w-[265px] shadow-2xl drop-shadow-2xl z-[1001]"
      >
        <div className="flex flex-col items-start" role="overlay">
          <span
            className={`px-2 leading-8 font-semibold text-gray-700 uppercase select-none pb-2`}
          >
            Vipanan
          </span>
          <div className="flex flex-col w-full">
            <HamburgerMenuItem href="/contents" role="contents-link" text="Content" />
            <HamburgerMenuItem href="/campaigns" role="campaigns-link" text="Campaign" />
            <HamburgerMenuItem href="/templates" role="template-link" text="Email" />
          </div>
        </div>
      </OverlayPanel>
    </>
  );
}