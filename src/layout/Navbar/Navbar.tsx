import Container from "../Container";
import Link from "next/link";
import { getCategories } from "@/services/CategoryService";
import MainNav from "./MainNav";
import NavbarAction from "./NavbarAction";
export const revalidate = 0;
async function Navbar() {
  const cartegories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>

          <MainNav data={cartegories} />
          <NavbarAction />
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
