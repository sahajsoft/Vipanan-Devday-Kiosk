import React from "react";
import Image from "next/image";

export function Banner() {
  return (
    <div className="relative w-full bg-sahaj-purple py-8">
      <div className="container relative z-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Content Listing
          </h1>
          <p className="mt-2 text-lg text-gray-200">
            Manage and organize your content
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-sahaj-violet px-4 py-2 text-white hover:bg-opacity-90 transition-colors">
            + Add Content
          </button>
        </div>
      </div>
      
      {/* Abstract shapes in the background */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/30 blur-3xl"></div>
        <div className="absolute -bottom-8 left-1/4 h-40 w-40 rounded-full bg-white/20 blur-2xl"></div>
      </div>
    </div>
  );
} 