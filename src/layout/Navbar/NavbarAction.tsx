"use client";

import { Button } from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { ShoppingBag, UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import { Session } from "next-auth";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";

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
  return (
    <div className=" w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className={"border-none"}>
              <IconButton
                className="bg-black p-[6px] border-none"
                onClick={undefined}
                icon={
                  <div className="w-[25px] font-bold  text-white ">
                    {data?.user?.name?.substring(0, 1)}
                  </div>
                }
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute  z-10 mt-3 -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className=" bg-white p-2">
                    <div className="flex gap-x-4">
                      <Avatar
                        className="w-[50px]"
                        alt="avatar of Jese"
                        img={data?.user?.image + ""}
                        rounded
                      />
                      <div>
                        <h4 className="font-semibold">{data?.user?.name}</h4>
                        <p className="text-neutral-700 line-clamp-2">
                          {data?.user?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <hr className="my-3 h-0.5 border-t-0 bg-black opacity-100 " />
                      <Link href={"/signout"}>Sign out</Link>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
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
      {data?.user?.email ? (
        <LoggedInUser data={data} />
      ) : (
        <Signin router={router} />
      )}

      <Cart router={router} />
    </div>
  );
}

export default NavbarAction;
