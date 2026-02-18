import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutWrapper } from "@/components/layout-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "EditorsForUK | Premium Academic Writing Services",
    template: "%s | EditorsForUK",
  },
  description:
    "Premium academic writing services trusted by students across UK universities. Expert writers, guaranteed quality, delivered on time.",
  keywords: [
    "academic writing",
    "essay writing",
    "dissertation help",
    "assignment writing",
    "UK university",
    "coursework help",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
