'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState, useRef } from 'react';
import {
  Menu, Search, ShoppingCart, User, LogOut, LayoutDashboard, Package, History,
  ChartBar, HistoryIcon, Heart, Settings, CircleQuestionMark, SendToBack, Coins, ShoppingBagIcon
} from "lucide-react";
import { useWishlistStore } from '@/stores/wishlistStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import SearchSuggestions from './SearchSuggestions';
import { useNotificationStore } from '@/stores/notificationStore';

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  const { wishlistedProductIds, fetchWishlist, clearWishlistOnLogout } = useWishlistStore();
  const { fetchNotifications } = useNotificationStore();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
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
  
  const AccountPopover = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
            {user ? (
                <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            ) : (
                <User className="h-6 w-6" />
            )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        {token && user ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2">
              <Avatar>
                 <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm truncate">{user.name}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
            </div>
            <Separator />
            <nav className="flex flex-col gap-1 p-1">
              {user.role === 'customer' && (
                <>
                  <Link href="/customer/my-orders" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><HistoryIcon className="mr-2 h-4 w-4" />Riwayat Pesanan</Link>
                  <Link href="/customer/points" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><Coins className="mr-2 h-4 w-4" />Poin</Link>
                  <Link href="/customer/wishlist" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><Heart className="mr-2 h-4 w-4" />Disukai</Link>
                  <Link href="/customer/profile" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><Settings className="mr-2 h-4 w-4" />Pengaturan Akun</Link>
                </>
              )}
              {user.role === 'store_owner' && (
                <>
                  <Link href="/owner/dashboard" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><ChartBar className="mr-2 h-4 w-4" />Dashboard</Link>
                  {/* <Link href="/owner/my-products" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><Package className="mr-2 h-4 w-4" />Produk</Link>
                  <Link href="/owner/orders" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><History className="mr-2 h-4 w-4" />Pesanan</Link>
                  <Link href="/owner/qna" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><CircleQuestionMark className="mr-2 h-4 w-4" />Tanya Jawab</Link>
                  <Link href="/owner/returns" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><SendToBack className="mr-2 h-4 w-4" />Pengembalian</Link> */}
                  </>
              )}
              {user.role === 'admin' && (
                <Link href="/admin/users" className="flex items-center p-2 rounded-md hover:bg-accent text-sm"><LayoutDashboard className="mr-2 h-4 w-4" /> Panel Admin</Link>
              )}
            </nav>
            <Separator />
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        ) : (
          <div className="grid gap-2">
            <Button asChild><Link href="/login" className="w-full">Login</Link></Button>
            <Button variant="outline" asChild><Link href="/register" className="w-full">Register</Link></Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );

  const AccountActionsMobile = () => (
    <>
      {user && user.role === 'customer' && (
        <>
            <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist" asChild>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart className="h-6 w-6" />
                    {wishlistedProductIds.size > 0 && (
                                  <Badge variant="destructive" className="absolute top-0 right-0 h-4 w-4 p-2 flex items-center justify-center text-white">
                          {wishlistedProductIds.size}</Badge>
                    )}
                </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart" asChild>
                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingCart className="h-6 w-6" />
                    {cartItems.length > 0 && (
                                  <Badge variant="destructive" className="absolute top-0 right-0 h-4 w-4 p-2 flex items-center justify-center text-white">
                          {cartItems.length}</Badge>
                    )}
                </Link>
            </Button>
        </>
      )}
      {user && <NotificationDropdown />}
      {/* Popover Akun sudah dipindah keluar dari menu mobile */}
    </>
  );

  return (
    <header className="py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 ">
      <div className="container mx-auto px-4 flex max-w-7xl justify-between items-center gap-4 ">
        <div className="flex items-center gap-8">
            <Logo />
        </div>
        
        <div className="hidden lg:flex flex-1 max-w-xl ml-4" ref={searchContainerRef}>
          <nav className="flex text-sm font-medium gap-4">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-foreground hover:text-primary"> {link.label}</Link>))}
          </nav>
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
            {/* --- TAMPILAN DESKTOP --- */}
            <div className="hidden lg:flex items-center gap-1">
                {user && user.role === 'customer' && (
                  <>
                      {/* <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist" asChild>
                          <Link href="/wishlist">
                              <Heart className="h-6 w-6" />
                              {wishlistedProductIds.size > 0 && (
                                  <Badge variant="destructive" className="absolute top-0 right-0 h-4 w-4 p-2 flex items-center justify-center text-white">
                                    {wishlistedProductIds.size}</Badge>
                              )}
                          </Link>
                      </Button> */}
                      <Button variant="ghost" size="icon" className="relative" aria-label="Cart" asChild>
                          <Link href="/cart">
                              <ShoppingCart className="h-6 w-6" />
                              {cartItems.length > 0 && (
                                  <Badge variant="destructive" className="absolute top-0 right-0 h-4 w-4 p-2 flex items-center justify-center text-white">
                                    {cartItems.length}</Badge>
                              )}
                          </Link>
                      </Button>
                  </>
                )}
                {user && <NotificationDropdown />}
                <AccountPopover />
            </div>
            
            <div className="lg:hidden flex items-center gap-2">
              <AccountPopover /> {/* <-- Popover dipindah ke sini */}
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
                        {/* Komponen ini sekarang tidak lagi berisi Popover Akun */}
                        <AccountActionsMobile />
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