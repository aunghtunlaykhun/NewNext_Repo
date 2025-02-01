import React from "react";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = localFont({
  src:'./fonts/InterVF.ttf',
  variable:'--font-inter',
  weight:"100 200 300 400 500 600 700 800 900",
});

const spaceGrotesk = localFont({
  src:'./fonts/SpaceGroteskVF.ttf',
  variable:'--font-space-grotesk',
  weight:"300 400 500 600 700"
})


export const metadata: Metadata = {
  title: "DevFlow",
  description: "A community-driven platform for asking and answering programming questions.Get help , share knowledge , and collbrate with deve option from around the world .Explore topics in web development , mobile app development , algorithms , data structures and more",
  icons:{
    icon:'/images/site-logo.svg'
  }
};

const  RootLayout = async({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)=> {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <header>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </header>
      <SessionProvider session={session}>
      <body
        className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;
