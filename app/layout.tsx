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

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-white font-bold text-2xl flex items-center">
        Ahorro Digital
     
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 ml-2"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="3" y="12" width="3" height="9" rx="0.5" />
          <rect x="9" y="8" width="3" height="13" rx="0.5" />
          <rect x="15" y="4" width="3" height="17" rx="0.5" />
          <rect x="21" y="2" width="3" height="19" rx="0.5" />
        </svg>
      </span>
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Navbar */}
        <header className="bg-[#244672] text-white shadow-md">
          <nav className="max-w-[90rem] mx-auto px-6 py-5 flex justify-between items-center">
            <Logo />

            <div className="flex gap-8 font-medium text-lg">
              <Link
                href="/products"
                className="hover:text-blue-300 transition-colors"
              >
                Productos
              </Link>
            </div>
          </nav>
        </header>

        {/* Contenido */}
        {children}

        {/* Footer */}
        <footer className="bg-[#244672] text-white py-6 mt-12">
          <div className="max-w-[90rem] mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Ahorro Digital. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
