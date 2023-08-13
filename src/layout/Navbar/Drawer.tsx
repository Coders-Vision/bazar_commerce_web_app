"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { X, MenuIcon } from "lucide-react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import { Category } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DrawerProps {
  data: Category[];
}

function Drawer({ data }: DrawerProps) {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      <IconButton
        className="flex items-center gap-x-2 lg:hidden"
        icon={<MenuIcon size={15} />}
        onClick={onOpen}
      />

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-between px-4">
              <h4 className="text-xl font-black py-2"> CATEGORIES </h4>
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <div className="flex flex-col ">
              {routes.map((route) => (
                <div
                  key={route.href}
                  className={cn(
                    "py-3 transition-color",
                    "cursor-pointer",
                    route.active ? "bg-black" : "hover:bg-neutral-100"
                  )}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      "text-base font-bold px-3",
                      route.active ? "text-white" : "text-neutral-500"
                    )}
                  >
                    {route.label}
                  </Link>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default Drawer;
