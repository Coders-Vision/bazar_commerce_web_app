"use client";

import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag, UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { Session } from "next-auth";

function Cart({ router }: { router: AppRouterInstance }) {
  const cart = useCart();
  return (
    <Button
      onClick={() => router.push("/cart")}
      className="flex items-center rounder-full bg-black px-4 py-2"
    >
      <ShoppingBag size={20} color="white" />
      <span className="ml-2 text-sm font-medium text-white">
        {cart.items.length}
      </span>
    </Button>
  );
}

function Signin({ router }: { router: AppRouterInstance }) {
  return (
    <IconButton
      className="bg-black"
      onClick={() => router.push("/signin")}
      icon={<UserCircle2 size={20} color="white" />}
    />
  );
}

function LoggedInUser({ data }: { data: Session | null }) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className="relative w-full">
      <IconButton
        className="bg-black p-[6px] "
        onClick={undefined}
        icon={
          <div className="w-[25px] font-bold  text-white ">
            {data?.user?.name?.substring(0, 1)}
          </div>
        }
      />

      <div className="absolute p-4 top-[65px] left-[5px] bg-neutral-100 rounded-lg shadow-md w-[250px] h-[125px]">
        <div className="flex gap-x-4">
          <Avatar
            className="w-[25px]"
            alt="avatar of Jese"
            img={data?.user?.image + ""}
            rounded
          />
          <div>
            <h4>{data?.user?.name}</h4>
            <p>{data?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function NavbarAction() {
  const [isMounted, setIsMounted] = useState(false);
  const { data } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-1">
      {/* {data?.user?.email ? <LoggedInUser /> : <Signin router={router} />} */}
      <LoggedInUser data={data} />
      <Cart router={router} />
    </div>
  );
}

export default NavbarAction;
