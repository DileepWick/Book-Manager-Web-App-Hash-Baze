"use client"; // required for client components

import { ApolloProvider } from "@apollo/client/react";
import client from "./lib/apolloClient";
import "./globals.css";

// Import Poppins from Google Fonts
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head />
      <title>Book-Manager-Web-App-Hash-Baze</title>
      <body className="font-body">
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
