"use client";
import { ConfirmationContext } from "@/context/confirmation-context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

interface BandProps {
  text: string;
  backUrl: string | null;
}

export default function Band(props: BandProps) {
  const [showModal, setShowModal] = useState(false);
  const { ask: askConfirmation, change: changeConfirmation } = useContext(ConfirmationContext);
  const router = useRouter();

  const handleClickBack = () => {
    if (askConfirmation) {
      setShowModal(true);
    } else {
      router.push(props.backUrl!);
    }
  };

  const closeModal = () => setShowModal(false);
  const acceptAction = () => {
    closeModal();
    changeConfirmation(true);
    router.push(props.backUrl!);
  };

  return (
    <>
      <div className="sticky top-[63px] z-50">
        <div 
          role="header-band" 
          className="h-[6.375rem] bg-sahaj-purple flex items-center justify-between px-8"
        >
          <div className="flex items-center gap-8">
            {props.backUrl && (
              <button 
                onClick={handleClickBack}
                className="cursor-pointer transition rounded-full ease-in-out p-2 hover:bg-white/20 hover:scale-110"
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
              {props.text}
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
    </>
  );
}