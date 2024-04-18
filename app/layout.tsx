import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Provider from "@/redux/provider";
import Setup from "./components/utils/setup";
import React from 'react';


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="justify-between">
        <Provider>
          <Setup />
          <Navbar />
          <div className=" justify-center items-center p-24">{children}</div>
          <Footer />
        </Provider>
        
      </body>
    </html>
  );
}
