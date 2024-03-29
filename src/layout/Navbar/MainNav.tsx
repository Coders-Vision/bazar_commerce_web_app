"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types/types";


import Link from "next/link";
interface MainNavProps {
  data: Category[];
}

function MainNav({ data }: MainNavProps) {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route._id}`,
    label: route.nameEn,
    active: pathname === `/category/${route._id}`,
  }));
  return (
    <nav className="mx-6 hidden  lg:flex  items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-black",
            route.active ? "text-black" : "text-neutral-500"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}


export default MainNav