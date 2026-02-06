import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahorro Digital",
  description: "Simulador y productos bancarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Navbar */}
       <header className="bg-[#244672] text-white shadow-lg backdrop-blur">

          <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

            <Link href="/" className="text-xl font-bold">
              Ahorro Digital
            </Link>

            <div className="flex gap-6 font-medium">
              <Link href="/products" className="hover:text-blue-200 transition-colors">
                Productos
              </Link>

              <Link href="/simulator" className="hover:text-blue-200 transition-colors">
                Simulador
              </Link>

              <Link href="/onboarding" className="hover:text-blue-200 transition-colors">
                Abrir Cuenta
              </Link>
            </div>

          </nav>
        </header>

        {/* Contenido de páginas */}
        <main className="max-w-6xl mx-auto p-6">
          {children}
        </main>

      </body>
    </html>
  );
}
