import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar/Navbar";
import ModalProvider from "@/context/ModalContext";
import ToasterProvider from "@/providers/toast-provider";
import SessionAuthProvider from "@/providers/session-auth-provider";
import getCurrentHost from "@/utils/get-current-host";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: getCurrentHost(),
  title: {
    default: "Bazar Commerce",
    template: `%s | Bazar Commerce`,
  },
  description: "A new age store for all your needs! ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SessionAuthProvider>
          <ModalProvider>
            <ToasterProvider />
            {/* <Header /> */}
            <Navbar />
            {children}
            <Footer />
          </ModalProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
