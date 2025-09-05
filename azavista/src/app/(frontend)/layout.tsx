import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  description: "Azavista Website",
  title: "Azavista Website",
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

        <main className="container mx-auto">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
