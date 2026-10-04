import React, { useState } from 'react';
import { Phone, ShoppingBag, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/hatcheryData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-emerald-800 transition-colors group-hover:text-emerald-700">
              রাবেয়া হ্যাচারি
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              সিরাজগঞ্জ
            </span>
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-slate-700">
            <a href="#breeds" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              বাচ্চার তালিকা
            </a>
            <a href="#price-table" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              মূল্যতালিকা
            </a>
            <a href="#order-calculator" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              অর্ডার ক্যালকুলেটর
            </a>
            <a href="#payment-gateway" className="hover:text-emerald-700 transition-colors whitespace-nowrap font-semibold text-emerald-800">
              পেমেন্ট তথ্য
            </a>
            <a href="#profit-planner" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              লাভের হিসাব
            </a>
            <a href="#farm-guides" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              খামার পরামর্শ
            </a>
            <a href="#about-owner" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              যোগাযোগ
            </a>
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.rawPhone}`}
              className="hidden lg:inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{CONTACT_INFO.phone}</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 px-3.5 py-2 rounded-lg transition-colors shadow-sm whitespace-nowrap cursor-pointer"
              aria-label="View Order Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">অর্ডার তালিকা</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 flex items-center justify-center text-[11px] font-bold bg-amber-400 text-slate-900 rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <a
              href="#breeds"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              বাচ্চার তালিকা
            </a>
            <a
              href="#price-table"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              মূল্যতালিকা
            </a>
            <a
              href="#order-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              অর্ডার ক্যালকুলেটর
            </a>
            <a
              href="#payment-gateway"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors font-semibold text-emerald-800"
            >
              💳 পেমেন্ট পদ্ধতি (বিকাশ/নগদ/ব্যাংক)
            </a>
            <a
              href="#profit-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              লাভের হিসাব
            </a>
            <a
              href="#farm-guides"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              খামার পরামর্শ
            </a>
            <a
              href="#about-owner"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
            >
              আমাদের ঠিকানা ও যোগাযোগ
            </a>
          </nav>
          
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${CONTACT_INFO.rawPhone}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 py-2.5 rounded-lg"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>সরাসরি কল: {CONTACT_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
