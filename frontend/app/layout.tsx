import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "AI Career Guidance Navigator | Intelligent Placement Mentor",
  description: "Autonomous multi-agent platform empowering students with career recommendations, skill gap analysis, roadmaps, and AI mock interviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-violet-500 selection:text-white">
        {/* Ambient background glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[128px]" />
          <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-600/15 blur-[128px]" />
          <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-indigo-600/15 blur-[128px]" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
