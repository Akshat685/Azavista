import React from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import "./globals.css";

import type { Navbar as NavbarType } from "@/payload-types";

export const metadata = {
  title: "Azavista ",
  description: "Azavista Website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navbar: NavbarType | undefined;
  
  try {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.find({ collection: "navbar", depth: 2, limit: 1 });
    navbar = data.docs?.[0];
  } catch (err) {
    console.error("Error loading navbar:", err);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {navbar && <Navbar navbar={navbar} />}

        <div >
          <Breadcrumbs />
        </div>

        <main className="container mx-auto">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
