'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, User, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import CartSidebar from '@/components/CartSidebar';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const { getItemCount } = useCartStore();
  const { user, isAuthenticated, logout } = useUserStore();
  const cartItemCount = getItemCount();

  const mainNavItems = [
    { label: 'Shop by Collection', href: '/collections' },
    {
      label: 'Our Favorites',
      href: '#',
      dropdown: [
        { label: "Editor's Favorites", href: '/favorites/editors' },
        { label: 'Trending', href: '/favorites/trending' },
        { label: 'Gadgets', href: '/favorites/gadgets' },
        { label: 'Home Decor', href: '/favorites/home-decor' }
      ]
    },
    { label: 'AI Face Test', href: '/ai-face-test' },
    { label: 'Blog', href: '/blog' },
    {
      label: 'Contact',
      href: '#',
      dropdown: [
        { label: 'Track Your Order', href: '/track-order' },
        { label: 'Contact', href: '/contact' },
        { label: 'Returns & Refunds', href: '/returns' }
      ]
    },
    { label: 'Mobile APP', href: '/app' },
    {
      label: 'Make Money',
      href: '#',
      dropdown: [
        { label: 'Sell on Mavigadget', href: '/sell' },
        { label: 'Become an Affiliate', href: '/affiliate' },
        { label: 'Advertise on Mavigadget', href: '/advertise' },
        { label: 'Publish Your Article', href: '/publish' },
        { label: 'Wholesale', href: '/wholesale' }
      ]
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top bar */}
      <div className="bg-blue-900 text-white py-1 px-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto text-sm">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>English</span>
            <ChevronDown className="w-3 h-3" />
          </div>
          <div className="flex items-center gap-4">
            <span>$ USD - EN</span>
            <Link href="/login" className="hover:underline">Log in</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            MAVIGADGET<sup className="text-xs">®</sup>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search by products, colors, or more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12"
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              LOG IN
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setCartSidebarOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-4 mt-8">
                  {mainNavItems.map((item) => (
                    <div key={item.label}>
                      {item.dropdown ? (
                        <div>
                          <p className="font-medium text-gray-900 mb-2">{item.label}</p>
                          <div className="space-y-2 ml-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="block text-gray-600 hover:text-gray-900"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block font-medium text-gray-900 hover:text-gray-600"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="border-t bg-gray-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            {mainNavItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                      {item.label}
                      <ChevronDown className="w-3 h-3" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.label} asChild>
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar
        open={cartSidebarOpen}
        onClose={() => setCartSidebarOpen(false)}
      />
    </header>
  );
};

export default Header;
