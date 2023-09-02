import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar/Navbar";
import ModalProvider from "@/context/ModalContext";
import ToasterProvider from "@/providers/toast-provider";
import SessionAuthProvider from "@/providers/session-auth-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazar Commerce",
  description: "Generated by create next app",
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
