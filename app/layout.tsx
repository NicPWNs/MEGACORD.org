import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MEGACORD",
  description: "The official website of the MEGACORD.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#202225"></meta>
      </head>
      <body>{children}</body>
    </html>
  );
}
