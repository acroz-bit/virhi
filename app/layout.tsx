import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vrihi — From soil to story",
  description: "A modern agricultural company rooted in thoughtful cultivation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
