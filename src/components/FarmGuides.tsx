import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, ChevronUp, Sparkles, Phone } from 'lucide-react';
import { FARM_GUIDES, CONTACT_INFO } from '../data/hatcheryData';
import { FarmGuide } from '../types/hatchery';

export const FarmGuides: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(FARM_GUIDES[0].id);

  const activeGuide = FARM_GUIDES.find(g => g.id === selectedGuideId) || FARM_GUIDES[0];

  return (
    <section id="farm-guides" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>খামারি প্রশিক্ষণ ও পরামর্শ</span>
            <span aria-hidden="true">·</span>
            <span>সফল খামারের গাইডলাইন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            হাঁস ও মুরগি পালন ও খামার পরিচর্যা নির্দেশিকা
          </h2>
          <p className="text-sm text-slate-600">
            শুধু বাচ্চা সরবরাহ করাই নয়—বাচ্চার সঠিক ব্রুডিং, খাদ্য ব্যবস্থাপনা, ভ্যাকসিন ও সঠিক পরিচর্যার মাধ্যমে খামারির সাফল্য নিশ্চিত করাই আমাদের লক্ষ্য।
          </p>
        </div>

        {/* Guides Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Guide Selector Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              পরামর্শ বিষয়সমূহ
            </h3>

            <div className="space-y-2">
              {FARM_GUIDES.map((guide) => {
                const isActive = guide.id === selectedGuideId;
                return (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedGuideId(guide.id)}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                        : 'bg-white/60 border-slate-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>{guide.readTime}</span>
                      {isActive && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <div className={`text-sm font-bold leading-snug ${isActive ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {guide.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Direct Consultation Box */}
            <div className="p-5 bg-emerald-800 text-white rounded-2xl space-y-3 mt-6">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-300" />
                <span>ব্যক্তিগত পরামর্শ প্রয়োজন?</span>
              </h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                আপনার খামারের শেড তৈরি, বাচ্চার অসুস্থতা বা খাদ্য সংক্রান্ত যেকোনো জিজ্ঞাসায় মোঃ মনিরুল ইসলাম ভাইয়ের সাথে সরাসরি কথা বলুন।
              </p>
              <a
                href={`tel:${CONTACT_INFO.rawPhone}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-4 py-2.5 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-900" />
                <span>সরাসরি কল: {CONTACT_INFO.phone}</span>
              </a>
            </div>

          </div>

          {/* Guide Details View */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            
            <div className="pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium mb-1">
                <span>রাবেয়া হ্যাচারি প্র্যাকটিক্যাল গাইড</span>
                <span aria-hidden="true">·</span>
                <span>{activeGuide.readTime}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activeGuide.title}
              </h3>
              <p className="text-sm text-slate-600 mt-2 font-medium">
                {activeGuide.summary}
              </p>
            </div>

            {/* Step-by-Step details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                ধাপসমূহ ও করণীয় নির্দেশনা
              </h4>
              <div className="space-y-3">
                {activeGuide.details.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Caution points */}
            <div className="p-4 sm:p-5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>খামারির বিশেষভাবে মনে রাখার বিষয়</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950 list-disc list-inside">
                {activeGuide.importantPoints.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
