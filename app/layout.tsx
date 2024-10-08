import type { Metadata } from "next";
import { Urbanist } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css";
import Providers from "./providers";

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
      <ClerkProvider>
        <body className={`${quicksand.className}`}>
          <Providers>{children}</Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
