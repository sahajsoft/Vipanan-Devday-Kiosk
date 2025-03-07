"use client";

import { useConfirmation } from "@/context/confirmation-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface BandProps {
  text: string;
  backUrl: string | null;
}

export default function Band({ text, backUrl }: BandProps) {
  const [showModal, setShowModal] = useState(false);
  const { ask: askConfirmation, change: changeConfirmation } = useConfirmation();
  const router = useRouter();

  const handleClickBack = () => {
    if (!backUrl) return;
    
    if (askConfirmation) {
      setShowModal(true);
    } else {
      router.push(backUrl);
    }
  };

  const closeModal = () => setShowModal(false);
  
  const acceptAction = () => {
    if (!backUrl) return;
    
    closeModal();
    changeConfirmation(true);
    router.push(backUrl);
  };

  return (
    <div className="sticky top-[63px] z-50">
      <div 
        role="header-band" 
        className="h-[6.375rem] bg-sahaj-purple flex items-center justify-between px-8"
      >
        <div className="flex items-center gap-8">
          {backUrl && (
            <button 
              onClick={handleClickBack}
              className="cursor-pointer transition rounded-full ease-in-out p-2 hover:bg-white/20 hover:scale-110"
              aria-label="Go back"
            >
              <Image 
                src="/images/go-back.svg" 
                alt="go-back" 
                width={24} 
                height={24}
              />
            </button>
          )}
          <span className="text-white font-mulish text-2xl font-bold my-auto">
            {text}
          </span>
        </div>
        <Image 
          src="/images/band-decoration.svg" 
          alt="decoration" 
          width={200} 
          height={102}
          className="hidden sm:block" 
        />
      </div>
    </div>
  );
}