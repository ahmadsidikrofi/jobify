import type { Metadata } from "next";
import { Urbanist } from 'next/font/google'
import "./globals.css";

const quicksand = Urbanist({  subsets: ['latin']})

export const metadata: Metadata = {
  title: "Jobify",
  description: "Job application tracking system for job hunters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className}`}
      >
        {children}
      </body>
    </html>
  );
}
