'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState, useRef } from 'react';
import { Menu, Search, ShoppingCart, User, LogOut, LayoutDashboard, Package, History, ChartBar, HistoryIcon, Heart, Settings, CircleQuestionMark, SendToBack, Coins, ShoppingBagIcon } from "lucide-react";
import { useWishlistStore } from '@/stores/wishlistStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import SearchSuggestions from './SearchSuggestions';
import { useNotificationStore } from '@/stores/notificationStore';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationDropdown from './NotificationDropdown';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Cari Produk" },
];

const Logo = () => (
    <Link href="/" className="flex items-center gap-2">
        <ShoppingBagIcon className="h-7 w-7 text-primary" />
        <span className="text-2xl font-bold text-primary">Grocery</span>
    </Link>
);

const SearchBar = ({ onSearchSubmit, searchTerm, setSearchTerm, onFocus, isMobile = false }: {
    onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onFocus: () => void;
    isMobile?: boolean;
}) => (
    <form onSubmit={onSearchSubmit} className="w-full flex">
        <Input
            type="search"
            placeholder="Cari produk..."
            className="rounded-r-none border-r-0 focus:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={onFocus}
        />
        <Button type="submit" className="rounded-l-none bg-primary hover:bg-primary/90 text-primary-foreground" size={isMobile ? 'icon' : 'default'}>
            <Search className="h-5 w-5" />
        </Button>
    </form>
);

export default function Header() {
  const { user, token, logout } = useAuthStore();
  const { items: cartItems, fetchCart, clearCartOnLogout } = useCartStore();
  // KOREKSI #1: Menggunakan nama properti yang benar dari store
  const { wishlistedProductIds, fetchWishlist, clearWishlistOnLogout } = useWishlistStore();
  const { fetchNotifications } = useNotificationStore();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setShowSuggestions(true);
    setIsSearching(true);
    const handler = setTimeout(async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const res = await fetch(`${apiUrl}/api/products/autocomplete?q=${searchTerm}`);
        const data = await res.json();
        setSuggestions(data.data || []);
      } catch (error) { console.error("Gagal fetch autocomplete:", error); setSuggestions([]); }
      finally { setIsSearching(false); }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);
  
  useEffect(() => {
    if (token) {
      fetchCart();
      fetchWishlist();
      fetchNotifications();
    }
  }, [token, fetchCart, fetchWishlist, fetchNotifications]);

  useEffect(() => { setIsClient(true); }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setShowSuggestions(false);
    setSearchTerm('');
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };
  
  const handleSuggestionClick = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    clearCartOnLogout();
    clearWishlistOnLogout();
    router.push('/');
    Cookies.remove('auth_role');
  };

  if (!isClient) {
    return (
      <header className="py-4 border-b">
        <div className="container mx-auto flex h-16 items-center px-4"></div>
      </header>
    );
  }
  
  const AccountActions = () => (
    <>
      {user && user.role === 'customer' && (
        <>
            <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist" asChild>
                <Link href="/wishlist">
                    <Heart className="h-6 w-6" />
                    {/* KOREKSI #2: Menggunakan .size untuk menghitung jumlah item di Set */}
                    {wishlistedProductIds.size > 0 && (
                        <Badge variant="destructive" className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">{wishlistedProductIds.size}</Badge>
                    )}
                </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart" asChild>
                <Link href="/cart">
                    <ShoppingCart className="h-6 w-6" />
                    {cartItems.length > 0 && (
                        <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">{cartItems.length}</Badge>
                    )}
                </Link>
            </Button>
        </>
      )}
      {user && <NotificationDropdown />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-6 w-6" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {token && user ? (
            <>
              <DropdownMenuLabel>Hi, {user.name}!</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.role === 'customer' && (
              <>
                <DropdownMenuItem asChild><Link href="/my-orders"><HistoryIcon className="mr-2 h-4 w-4" />Riwayat Pesanan</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/my-account/points"><Coins className="mr-2 h-4 w-4" />Poin</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/wishlist"><Heart className="mr-2 h-4 w-4" />Disukai</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/my-account/profile"><Settings className="mr-2 h-4 w-4" />Pengaturan Akun</Link></DropdownMenuItem>
              </>
              )}
              {user.role === 'store_owner' && (
                <>
                  <DropdownMenuItem asChild><Link href="/owner/dashboard"><ChartBar className="mr-2 h-4 w-4" />Dashboard</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/owner/my-products"><Package className="mr-2 h-4 w-4" />Produk</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/owner/orders"><History className="mr-2 h-4 w-4" />Pesanan</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/owner/qna"><CircleQuestionMark className="mr-2 h-4 w-4" />Tanya Jawab</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/owner/returns"><SendToBack className="mr-2 h-4 w-4" />Pengembalian Barang</Link></DropdownMenuItem>
                </>
              )}
              {user.role === 'admin' && (<DropdownMenuItem asChild><Link href="/admin/users"><LayoutDashboard className="mr-2 h-4 w-4" /> Panel Admin</Link></DropdownMenuItem>)}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer focus:bg-red-50 focus:text-red-600"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/register">Register</Link></DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <header className="py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex max-w-7xl justify-between items-center gap-4">
        <div className="flex items-center gap-8">
            <Logo />
        </div>

        <div className="hidden lg:flex flex-1 max-w-xl" ref={searchContainerRef}>
            <div className="relative w-full">
                <SearchBar 
                    onSearchSubmit={handleSearchSubmit} 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onFocus={() => { if (searchTerm.length > 1) setShowSuggestions(true) }}
                />
                {showSuggestions && (
                    <SearchSuggestions 
                        suggestions={suggestions} 
                        isLoading={isSearching}
                        onSuggestionClick={handleSuggestionClick} 
                    />
                )}
            </div>
        </div>

        <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1">
                <AccountActions />
            </div>
            
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                      <Menu /><span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 py-8 h-full">
                    <div ref={searchContainerRef}>
                        <SearchBar 
                            onSearchSubmit={handleSearchSubmit} 
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onFocus={() => { if (searchTerm.length > 1) setShowSuggestions(true) }}
                            isMobile={true}
                        />
                        {showSuggestions && (
                            <SearchSuggestions 
                                suggestions={suggestions} 
                                isLoading={isSearching}
                                onSuggestionClick={handleSuggestionClick} 
                            />
                        )}
                    </div>

                    <div className='flex items-center justify-around border-y py-2'>
                        <AccountActions />
                    </div>

                    <nav className="flex flex-col gap-4 text-lg font-medium flex-grow">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label} 
                                href={link.href} 
                                className="text-muted-foreground hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}