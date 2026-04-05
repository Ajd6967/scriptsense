import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "ScriptSense — AI Medication Management for Seniors",
  description:
    "ScriptSense uses AI to analyze your complete medication regimen, flag dangerous drug interactions, optimize timing, and recommend supplements — designed specifically for seniors 65+.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
