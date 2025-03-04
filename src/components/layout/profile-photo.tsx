"use client";

import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

export default function ProfilePhoto() {
  return (
    <Avatar className="h-8 w-8 cursor-pointer">
      <Image
        src="/images/user-profile.svg"
        alt="User"
        width={32}
        height={32}
        className="h-full w-full object-cover"
      />
    </Avatar>
  );
} 