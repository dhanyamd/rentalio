import type { Metadata } from "next";
import { Nunito} from "next/font/google";
import "./globals.css";
import NavBar from "./components/Navbar";
import Modal from "./components/modals/Modals";


export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal title="hello world" isOpen={true}/>
        <NavBar/>
        {children}</body>
    </html>
  );
}
