import React from "react";

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">

        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
