import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import IndustriesDropdown from "@/components/IndustriesDropdown";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linka - Your Local E-commerce Platform",
  description: "Connect with local retailers and discover amazing products in your area",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Linka</h1>
            <IndustriesDropdown />
          </header>

          <main className="p-6">
            {children}
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
