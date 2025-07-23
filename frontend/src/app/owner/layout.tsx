// src/app/owner/layout.tsx

import SidebarNav from "@/components/owner/SidebarNav";
import { Toaster } from 'react-hot-toast';

export default function OwnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Kolom Sidebar */}
        <aside className="lg:col-span-1">
          {/* Komponen navigasi akan ditempatkan di sini */}
          <SidebarNav />
        </aside>

        {/* Kolom Konten Utama */}
        <main className="lg:col-span-3">
          {/* Toaster untuk notifikasi, ditempatkan di sini agar konsisten */}
          <Toaster position="top-center" />
          {/* Konten dari setiap halaman akan dirender di sini */}
          {children}
        </main>
      </div>
    </div>
  );
}