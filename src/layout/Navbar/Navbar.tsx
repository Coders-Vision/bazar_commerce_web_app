import Container from "../Container";
import Link from "next/link";
import { getCategories } from "@/actions/category";
import MainNav from "./MainNav";
import NavbarAction from "./NavbarAction";
import Drawer from "./Drawer";


async function Navbar() {
  const cartegories = await getCategories();
  return (
    <div className="border-b">
      <Container>
        <></>
        <div className="relative flex items-center h-16 px-4 sm:px-6 lg:px-8">
          <Drawer data={cartegories} />
          <Link href="/" className="flex ml-4 lg:ml-0 gap-x-2">
            <p className="text-xl font-bold">Bazar</p>
          </Link>

          <MainNav data={cartegories} />
          <NavbarAction />
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
