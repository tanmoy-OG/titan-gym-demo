'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin } from 'lucide-react';

interface HeaderProps {
  subBar?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ subBar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', openNewTab: false },
    { name: 'About', href: '/about', openNewTab: true },
    { name: 'Branches', href: pathname === '/' ? '#branches-section' : '/#branches-section', openNewTab: false },
    { name: 'Programs', href: '/programs', openNewTab: true },
    { name: 'Gallery', href: '/gallery', openNewTab: true },
    { name: 'Blog', href: '/blog', openNewTab: true },
    { name: 'Contact Us', href: pathname === '/' ? '#contact-section' : '/#contact-section', openNewTab: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled || pathname !== '/' || Boolean(subBar)
            ? 'bg-[#08090d]/95 backdrop-blur-md py-3.5'
            : 'bg-gradient-to-b from-[#08090d]/90 to-transparent backdrop-blur-sm py-5'
        } ${subBar ? 'border-b border-white/10' : (isScrolled ? 'border-b border-white/10 shadow-2xl' : 'border-b border-white/5')}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Single text element wordmark */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase whitespace-nowrap shrink-0 hover:text-lime-400 transition-colors flex items-center gap-2"
          >
            <span className="w-2.5 h-6 bg-lime-400 skew-x-[-12deg]" />
            TITAN ATHLETIC CLUB
          </Link>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-zinc-300">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target={item.openNewTab ? '_blank' : undefined}
                rel={item.openNewTab ? 'noopener noreferrer' : undefined}
                className="hover:text-white hover:underline underline-offset-8 decoration-lime-400 decoration-2 transition-colors whitespace-nowrap shrink-0"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/payment"
              className="px-5 py-2 text-xs font-bold text-black uppercase tracking-wider bg-lime-400 rounded-md hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] whitespace-nowrap shrink-0"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/payment"
              className="px-3 py-1.5 text-xs font-bold text-black uppercase tracking-wider bg-lime-400 rounded hover:bg-lime-300 transition-all"
            >
              Join
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-md bg-white/5 border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-3 border-t border-white/10 bg-[#0d0f17]/95 rounded-xl p-4 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.openNewTab ? '_blank' : undefined}
                  rel={item.openNewTab ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-zinc-200 hover:text-lime-400 hover:bg-white/5 rounded-md transition-colors flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  {item.openNewTab && <span className="text-[10px] text-zinc-500 font-mono">NEW TAB ↗</span>}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/payment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-xs font-bold text-black uppercase tracking-wider bg-lime-400 rounded-md shadow-lg"
                >
                  Join Club Now
                </Link>
              </div>
            </nav>
          </div>
        )}
        </div>
      </div>

      {subBar && (
        <div className="w-full">
          {subBar}
        </div>
      )}
    </header>
  );
};

export default Header;
