import LeftSidebar from "@/components/navigation/LeftSidebar";
import Navbar from "@/components/navigation/navbar";
import RightSidebar from "@/components/navigation/RightSidebar";
import React from "react";

// export const metadata = {
//   title: "Dev Overflow",
//   description: "A community for asking and answering questions",
//   icons: {
//     icon: "/icons/favicon.svg",
//     shortcut: "/icons/favicon-shortcut.png",
//     apple: "/icons/apple-icon.png",
//   },
//   generator: "Next.js",
//   applicationName: "Dev Overflow",
//   referrer: "origin-when-cross-origin",
//   keywords: [
//     "Javascript",
//     "React",
//     "Next.js",
//     "web development",
//     "Dev OverFlow",
//   ],
//   authors: [{ name: "Khun Aung Htun Lay" }, { name: "Dev Team" }],
//   creator: "Khun Aung Htun Lay",
//   publisher: "Dev Overflow",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   openGraph: {
//     title: "Dev Flow | Ask & Answer Programming Questions",
//     description:
//       "Explore coding topics with help from the global dev community",
//     url: "https://devoverflow.dev",
//     siteName: "Dev Overflow",
//     images: [
//       {
//         url: "images/og-banner.png",
//         width: 1200,
//         height: 630,
//         alt: "Dev Overflow OG Banner",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />

      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
