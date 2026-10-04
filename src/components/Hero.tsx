import React from 'react';
import { Phone, MessageSquare, ArrowDown, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { CONTACT_INFO, HATCHERY_IMAGES } from '../data/hatcheryData';

interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenQuickOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onOpenQuickOrder }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust statement & Brand motto without pills */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-800">
              <span className="flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                {CONTACT_INFO.tagline}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-600">উল্লাপাড়া, সিরাজগঞ্জ</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
                মানসম্মত <span className="text-emerald-700">হাঁস ও মুরগির বাচ্চার</span> বিশ্বস্ত ঠিকানা
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                রাবেয়া হ্যাচারি থেকে বিভিন্ন জাতের সুস্থ, সবল ও চনমনে হাঁস এবং মুরগির বাচ্চা সাশ্রয়ী পাইকারি মূল্যে সংগ্রহ করুন। নতুন ও অভিজ্ঞ খামারিদের জন্য রয়েছে সঠিক তথ্য ও খামার ব্যবস্থাপনার সার্বক্ষণিক পরামর্শ।
              </p>

              <blockquote className="border-l-4 border-emerald-600 pl-4 py-1 text-sm sm:text-base italic text-slate-700 bg-emerald-50/50 rounded-r-lg max-w-xl">
                "{CONTACT_INFO.subQuote}"
              </blockquote>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#breeds"
                onClick={onScrollToCatalog}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer"
              >
                <span>বাচ্চার তালিকা ও দরদাম</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('আসসালামু আলাইকুম রাবেয়া হ্যাচারি, আমি হাঁস/মুরগির বাচ্চার বর্তমান মজুত ও দাম সম্পর্কে জানতে চাই।')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-emerald-900 bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-600 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>হোয়াটসঅ্যাপ মেসেজ</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.rawPhone}`}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>কল: {CONTACT_INFO.phone}</span>
              </a>
            </div>

            {/* Adjacency proof points */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">১০০%</div>
                <div className="text-xs text-slate-500 mt-0.5">সুস্থ ও সক্রিয় গ্রেড-এ বাচ্চা</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">১৮+</div>
                <div className="text-xs text-slate-500 mt-0.5">খামারি ও সৌখিন জাত</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 tabular-nums">সারাদেশে</div>
                <div className="text-xs text-slate-500 mt-0.5">নিরাপদ কার্টনে ডেলিভারি</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
              <img
                src={HATCHERY_IMAGES.hero}
                alt="রাবেয়া হ্যাচারি - আধুনিক হ্যাচারি ও সুস্থ বাচ্চার নার্সারি"
                referrerPolicy="no-referrer"
                className="w-full h-72 sm:h-96 object-cover object-center"
              />
              
              {/* Overlay banner at bottom */}
              <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>প্রশিক্ষিত হ্যাচারি ব্যবস্থাপনা</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    মোঃ মনিরুল ইসলাম, উল্লাপাড়া, সিরাজগঞ্জ
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-slate-600 shrink-0">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>কুরিয়ার ও পিকআপ</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
