// src/components/owner/SidebarNav.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBar,
  Package,
  History,
  CircleQuestionMark,
  SendToBack,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Definisikan tipe untuk setiap link navigasi
interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { href: "/owner/dashboard", label: "Dashboard", icon: ChartBar },
  { href: "/owner/my-products", label: "Produk Saya", icon: Package },
  { href: "/owner/orders", label: "Pesanan", icon: History },
  { href: "/owner/qna", label: "Tanya Jawab", icon: CircleQuestionMark },
  { href: "/owner/returns", label: "Pengembalian", icon: SendToBack },
  { href: "/owner/profile", label: "Pengaturan", icon: Settings },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <div>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}