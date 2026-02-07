import type { Metadata } from "next";
import type { JSX, ReactNode } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "WS OS",
  description: "Project work management workspace",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
