import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { META_THEME_COLORS, siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Client Components",
    "Server Components",
    "Interactive Components",
    "Animated Components",
    "Shadcn",
  ],
  authors: [
    {
      name: "cloff-ui",
      url: "https://ui.cloffstudio.com",
    },
  ],
  creator: "shadcn",
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
