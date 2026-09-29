import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-sand/30 border-t border-sand/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl font-bold tracking-widest text-espresso uppercase"
            >
              Morrow
            </Link>
            <p className="mt-4 text-coffee text-sm leading-relaxed max-w-md">
              Small-batch specialty coffee roasted for everyday rituals.
            </p>
            <div className="flex space-x-4 mt-6 text-sm font-medium text-coffee">
              <a
                href="#"
                className="hover:text-espresso transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href="#"
                className="hover:text-espresso transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <span>·</span>
              <a
                href="#"
                className="hover:text-espresso transition-colors"
                aria-label="Spotify"
              >
                Spotify
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-espresso font-semibold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-coffee hover:text-espresso transition-colors text-sm"
                >
                  All Coffee
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/espresso"
                  className="text-coffee hover:text-espresso transition-colors text-sm"
                >
                  Espresso
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/filter"
                  className="text-coffee hover:text-espresso transition-colors text-sm"
                >
                  Filter
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-espresso font-semibold mb-4 text-sm uppercase tracking-wider">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/our-story"
                  className="text-coffee hover:text-espresso transition-colors text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/journal"
                  className="text-coffee hover:text-espresso transition-colors text-sm"
                >
                  Journal
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-coffee hover:text-espresso transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-sand/60">
          <div className="max-w-md">
            <h3 className="text-espresso font-semibold mb-3 text-sm uppercase tracking-wider">
              Stay Updated
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 bg-ivory border border-sand text-espresso placeholder:text-coffee/50 focus:outline-none focus:border-coffee text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-espresso text-ivory hover:bg-espresso/90 transition-colors text-sm font-medium uppercase tracking-wider"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-sand/60 flex flex-col sm:flex-row justify-between items-center text-sm text-coffee">
          <p>&copy; 2026 Morrow Coffee. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-espresso transition-colors">
              Shipping
            </a>
            <a href="#" className="hover:text-espresso transition-colors">
              Returns
            </a>
            <a href="#" className="hover:text-espresso transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-espresso transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
