import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import 'lenis/dist/lenis.css';

import { NavProvider } from '@/components/context/nav-context';
import { InitProvider } from '@/components/context/init-context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nitish Maindoliya",
  description: "Portfolio of Nitish Maindoliya",
  icons: [
    {
      media: '(prefers-color-scheme: light)',
      url: '/favicon-light.ico',
    },
    {
      media: '(prefers-color-scheme: dark)',
      url: '/favicon-dark.ico',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <InitProvider>
        <NavProvider>
          <body className={inter.className}>{children}</body>
        </NavProvider>
      </InitProvider>
    </html>
  );
}
