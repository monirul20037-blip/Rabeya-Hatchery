import React from 'react';
import { Phone, MapPin, MessageSquare, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/hatcheryData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                রাবেয়া হ্যাচারি
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                সিরাজগঞ্জ
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {CONTACT_INFO.slogan}। খাকি ক্যাম্বেল, বেইজিং, পেকিন, সোনালি ও দেশি জাতের সুস্থ ও চনমনে বাচ্চার পাইকারি ও খুচরা সরবরাহকারী।
            </p>

            <blockquote className="border-l-2 border-emerald-500 pl-3 text-xs italic text-slate-400">
              "{CONTACT_INFO.subQuote}"
            </blockquote>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              প্রয়োজনীয় বিভাগ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#breeds" className="hover:text-emerald-400 transition-colors">
                  হাঁস ও মুরগির বাচ্চার তালিকা
                </a>
              </li>
              <li>
                <a href="#price-table" className="hover:text-emerald-400 transition-colors">
                  হালনাগাদ মূল্যতালিকা
                </a>
              </li>
              <li>
                <a href="#order-calculator" className="hover:text-emerald-400 transition-colors">
                  অর্ডার ও খরচ ক্যালকুলেটর
                </a>
              </li>
              <li>
                <a href="#profit-planner" className="hover:text-emerald-400 transition-colors">
                  খামারি লাভ-লোকসান হিসাব
                </a>
              </li>
              <li>
                <a href="#farm-guides" className="hover:text-emerald-400 transition-colors">
                  ব্রুডিং ও ভ্যাকসিন গাইডলাইন
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              যোগাযোগ ও হ্যাচারি ঠিকানা
            </h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${CONTACT_INFO.rawPhone}`} className="hover:text-white transition-colors tabular-nums">
                  {CONTACT_INFO.phone} (ফোন / ইমো / হোয়াটসঅ্যাপ)
                </a>
              </div>

              <div className="pt-2">
                <span className="block text-xs text-slate-500">স্বত্বাধিকারী:</span>
                <span className="text-sm font-bold text-white">{CONTACT_INFO.proprietor}</span>
              </div>
            </div>

            {/* Accepted Payments */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 block mb-2 font-medium">অনুমোদিত পেমেন্ট মাধ্যম:</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#D12053]/20 border border-[#D12053]/40 text-[#ff4f81] text-xs font-bold">
                  বিকাশ
                </span>
                <span className="px-2.5 py-1 rounded bg-[#EA1D25]/20 border border-[#EA1D25]/40 text-[#ff595f] text-xs font-bold">
                  নগদ
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold">
                  ইসলামী ব্যাংক
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium">
                  ক্যাশ
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} রাবেয়া হ্যাচারি (Rabeya Hatchery)। সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{CONTACT_INFO.tagline}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
