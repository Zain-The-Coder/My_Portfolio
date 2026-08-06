import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import SplashAnimation from "@/components/SplashAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zain Ur Rehman | MERN Stack Developer",
  description: "Portfolio of Zain Ur Rehman, a Full-Stack MERN Developer specializing in React.js, Next.js, Node.js, and Express.js.",
  openGraph: {
    title: "Zain Ur Rehman | MERN Stack Developer",
    description: "Portfolio of Zain Ur Rehman, a Full-Stack MERN Developer specializing in React.js, Next.js, Node.js, and Express.js.",
    url: "https://zain-ur-rehman-portfolio.vercel.app", // placeholder URL
    siteName: "Zain Ur Rehman Portfolio",
    images: [
      {
        url: "/og-image.jpg", // placeholder OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased selection:bg-primary-500/30 selection:text-primary-900 dark:selection:text-primary-100 relative`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SplashAnimation />
          <Navbar />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
