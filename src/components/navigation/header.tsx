"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCart } from "@/lib/hooks/use-cart";
import { AnnouncementBar } from "./announcement-bar";

export const Header = () => {
  const { items, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-sm border-b border-sand/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-espresso p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/shop"
                className="text-espresso hover:text-coffee transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Shop
              </Link>
              <Link
                href="/our-story"
                className="text-espresso hover:text-coffee transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Our Story
              </Link>
              <Link
                href="/journal"
                className="text-espresso hover:text-coffee transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Journal
              </Link>
            </nav>

            {/* Logo */}
            <div className="flex-1 md:flex-none text-center">
              <Link
                href="/"
                className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-espresso uppercase"
              >
                Morrow
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-6">
              <button
                type="button"
                className="text-espresso hover:text-coffee transition-colors p-1"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                className="text-espresso hover:text-coffee transition-colors p-1 hidden sm:block"
                aria-label="Account"
              >
                <User size={20} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-espresso hover:text-coffee transition-colors p-1 relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-espresso text-ivory text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-sand/40 bg-ivory px-4 pt-2 pb-6 space-y-3">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-espresso hover:text-coffee py-2 text-base font-medium tracking-wide uppercase"
            >
              Shop
            </Link>
            <Link
              href="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-espresso hover:text-coffee py-2 text-base font-medium tracking-wide uppercase"
            >
              Our Story
            </Link>
            <Link
              href="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-espresso hover:text-coffee py-2 text-base font-medium tracking-wide uppercase"
            >
              Journal
            </Link>
          </div>
        )}
      </header>
    </>
  );
};
