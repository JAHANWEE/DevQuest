import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevQuest",
  description: "Track developer quests, submissions, and progress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
