import React from 'react';
import { MapPin, Phone, MessageSquare, User, Navigation, Shield, Award, Calendar } from 'lucide-react';
import { CONTACT_INFO, HATCHERY_IMAGES } from '../data/hatcheryData';

export const AboutOwner: React.FC = () => {
  return (
    <section id="about-owner" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          <span>আমাদের পরিচয় ও ঠিকানা</span>
          <span aria-hidden="true">·</span>
          <span>বিশ্বস্ততার প্রতীক</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          রাবেয়া হ্যাচারি সম্পর্কে জানুন
        </h2>
        <p className="text-sm text-slate-600">
          সততা, সঠিক জাতের নিশ্চয়তা ও খামারির পাশে থাকার অঙ্গীকার নিয়ে সিরাজগঞ্জের উল্লাপাড়ায় আমরা সেবা দিয়ে আসছি।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Owner Portrait & Highlights */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="relative h-72 sm:h-80 bg-slate-100">
              <img
                src={HATCHERY_IMAGES.owner}
                alt="মোঃ মনিরুল ইসলাম - স্বত্বাধিকারী, রাবেয়া হ্যাচারি"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-3 left-4 bg-emerald-900/90 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-md">
                স্বত্বাধিকারী ও হ্যাচারি পরিচালক
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {CONTACT_INFO.proprietor}
                </h3>
                <p className="text-xs text-slate-500">
                  স্বত্বাধিকারী, রাবেয়া হ্যাচারি
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                "আমরা শুধু বাচ্চা সরবরাহ করি না, খামারি যাতে সঠিক তথ্য ও পরিচর্যায় লাভবান হতে পারেন, তার জন্য সার্বক্ষণিক যোগাযোগ রাখি। নতুনরা ছোট পরিসরে শুরু করলেই একদিন বড় খামারি হতে পারবেন।"
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>শতভাগ খাঁটি জাত</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>অভিজ্ঞ পরামর্শ</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Official Address & Communication Card */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                যোগাযোগ ও হ্যাচারির পূর্ণাঙ্গ ঠিকানা
              </h3>
              <p className="text-xs text-slate-500">
                সরাসরি এসে বাচ্চা দেখে নিতে পারেন অথবা কুরিয়ারের মাধ্যমে বুকিং করতে পারেন
              </p>
            </div>

            {/* Address Details */}
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase">হ্যাচারির অবস্থান:</span>
                  <span className="font-bold text-slate-900 block mt-0.5">
                    {CONTACT_INFO.address}
                  </span>
                  <span className="text-xs text-slate-500">
                    (উল্লাপাড়া পৌরসভা ও রেলওয়ে স্টেশন সংলগ্ন এলাকা)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl">
                <Phone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block font-semibold uppercase">মোবাইল / ইমো / হোয়াটসঅ্যাপ:</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <a href={`tel:${CONTACT_INFO.rawPhone}`} className="text-base font-black text-emerald-800 hover:underline tabular-nums font-mono">
                      {CONTACT_INFO.phone}
                    </a>
                    <span className="text-slate-300">|</span>
                    <a href={`tel:${CONTACT_INFO.rawPhoneSecondary}`} className="text-base font-black text-emerald-800 hover:underline tabular-nums font-mono">
                      {CONTACT_INFO.phoneSecondary}
                    </a>
                  </div>
                  <span className="text-xs text-slate-500 block">
                    (যেকোনো দিন সকাল ৭টা থেকে রাত ১০টা পর্যন্ত যোগাযোগ করা যাবে)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 bg-slate-50 rounded-xl">
                <Navigation className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase">যাতায়াত ও পৌঁছানোর পথ:</span>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    ঢাকা-বঙ্গবন্ধু সেতু হয়ে সিরাজগঞ্জ রোড গোলচত্বর পার হয়ে উল্লাপাড়া বাসস্ট্যান্ড অথবা উল্লাপাড়া রেলস্টেশনে নেমে ইসলামপুর ভূতগাছা গ্রামে সহজেই আসা যায়।
                  </p>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`tel:${CONTACT_INFO.rawPhone}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs"
              >
                <Phone className="w-4 h-4" />
                <span>সরাসরি কল দিন: {CONTACT_INFO.phone}</span>
              </a>

              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('আসসালামু আলাইকুম মনিরুল ভাই, আমি রাবেয়া হ্যাচারি থেকে বাচ্চার অর্ডার করতে চাই।')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>হোয়াটসঅ্যাপ / ইমোতে কথা বলুন</span>
              </a>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
