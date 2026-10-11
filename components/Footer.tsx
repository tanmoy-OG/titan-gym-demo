import React from 'react';
import Link from 'next/link';
import { GYM_INFO, BRANCHES_DATA } from '@/data/gymData';
import { Dumbbell, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050608] border-t border-white/10 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-white uppercase flex items-center gap-2"
            >
              <span className="w-2.5 h-6 bg-lime-400 skew-x-[-12deg]" />
              {GYM_INFO.name}
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">
              {GYM_INFO.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-lime-400 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Hyrox & Olympic Training Center</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore Titan
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Story & Values
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  All 10 Training Programs
                </Link>
              </li>
              <li>
                <Link href="/branch-details" className="hover:text-white transition-colors">
                  Club Facilities & Amenities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Athletic Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Transformation Stories & Member Blog
                </Link>
              </li>
              <li>
                <Link href="/plan-page" className="hover:text-white transition-colors">
                  Subscription Plans Breakdown
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Branches Directory */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Regional Clubs
            </h4>
            <ul className="space-y-3 text-xs">
              {BRANCHES_DATA.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/branch-details?branch=${b.id}`}
                    className="group block hover:text-white transition-colors"
                  >
                    <p className="font-semibold text-zinc-200 group-hover:text-lime-400 transition-colors">
                      {b.name}
                    </p>
                    <p className="text-zinc-500 text-[11px] truncate">{b.address}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h4>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-lime-400 shrink-0" />
              <span>{GYM_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-lime-400 shrink-0" />
              <span>{GYM_INFO.email}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
              <span className="leading-tight">{GYM_INFO.hours}</span>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${GYM_INFO.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-400 text-xs font-bold transition-all w-full justify-center group"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {GYM_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-zinc-600">Pure Iron · Pure Science · Zero Compromise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
