import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "cambridgewriters | Premium Academic Writing Services",
    template: "%s | cambridgewriters",
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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
