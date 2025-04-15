import type {Metadata} from "next";
import "./globals.css";
import {Header} from "@/widgets/header/Header"

export const metadata: Metadata = {
  title: "Pictorial SuperAdmin",
  description: "Pictorial SuperAdmin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <Header />
    <main>{children}</main>

    </body>
    </html>
  );
}
