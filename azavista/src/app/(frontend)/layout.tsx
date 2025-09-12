import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Breadcrumbs from "./components/Breadcrumbs";
import "./globals.css";

export const metadata = {
  title: "Azavista ",
  description: "Azavista Website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Navbar />

        <div >
          <Breadcrumbs />
        </div>

        <main className="container mx-auto">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
