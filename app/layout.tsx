import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "A11y",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-25">
        <AuthProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
        </AuthProvider>
        <Toaster
          position="top-center"
          theme="system"
          toastOptions={{
            classNames: {
              toast:
                "!bg-card !text-foreground !border !border-border !shadow-xl !rounded-xl",

              success: "!border !border-blue-500",
              error: "!border !border-red-500",
              warning: "!border !border-yellow-400",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
