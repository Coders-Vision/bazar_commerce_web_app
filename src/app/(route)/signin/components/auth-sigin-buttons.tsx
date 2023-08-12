"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import GoogleLogo from "../../../../../public/google.svg";
import Image from "next/image";

export function GoogleSigin() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-8 md:px-16 mt-4 md:text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus shadow-outline hover:bg-slate-200"
    >
      <Image alt="google_logo" src={GoogleLogo} width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </Button>
  );
}
