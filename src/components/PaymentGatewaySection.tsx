import React, { useState } from 'react';
import { CreditCard, Check, Copy, ShieldCheck, AlertCircle, Building2, Wallet, ArrowRight, Smartphone, Phone } from 'lucide-react';
import { PAYMENT_METHODS, CONTACT_INFO } from '../data/hatcheryData';

interface PaymentGatewaySectionProps {
  onOpenOrderModal?: () => void;
}

export const PaymentGatewaySection: React.FC<PaymentGatewaySectionProps> = ({ onOpenOrderModal }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'bank'>('all');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const mobileMethods = PAYMENT_METHODS.filter(m => m.category === 'mobile');
  const bankMethods = PAYMENT_METHODS.filter(m => m.category === 'bank');

  return (
    <section id="payment-gateway" className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              <span>নিরাপদ পেমেন্ট গেটওয়ে</span>
              <span aria-hidden="true">·</span>
              <span>মোবাইল ও বাংলাদেশ ব্যাংকিং</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              অফিশিয়াল পেমেন্ট পদ্ধতি ও ব্যাংক অ্যাকাউন্ট
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              রাবেয়া হ্যাচারীর বাচ্চার বুকিং নিশ্চিত করতে আমাদের অনুমোদিত বিকাশ, নগদ, রকেট বা ব্যাংক অ্যাকাউন্টে অগ্রিম প্রদান করুন।
            </p>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">১০০% ভেরিফাইড অফিশিয়াল একাউন্ট</span>
          </div>
        </div>

        {/* Official Banner Owner & Contact Notice */}
        <div className="my-6 p-4 sm:p-5 bg-emerald-900 text-white rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold uppercase tracking-wider">
              <span>রাবেয়া হ্যাচারী অফিশিয়াল ডিরেক্টরি</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold">
              প্রোঃ মোঃ মনিরুল ইসলাম (মোহন)
            </h3>
            <p className="text-xs text-emerald-100">
              উৎপাদন কেন্দ্রঃ ইসলামপুর ভূতগাছা, উল্লাপাড়া, সিরাজগঞ্জ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`tel:${CONTACT_INFO.rawPhone}`}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>01302-239137</span>
            </a>
            <a
              href={`tel:${CONTACT_INFO.rawPhoneSecondary}`}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300" />
              <span>01726-573014</span>
            </a>
            {onOpenOrderModal && (
              <button
                onClick={onOpenOrderModal}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 text-xs font-black rounded-xl transition-all shadow-sm cursor-pointer"
              >
                এখনই অর্ডার ও পেমেন্ট করুন
              </button>
            )}
          </div>
        </div>

        {/* Security Alert Banner */}
        <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">সতর্কবার্তা ও জালিয়াতি প্রতিরোধ:</p>
            <p className="text-amber-800 leading-relaxed">
              রাবেয়া হ্যাচারীর অফিশিয়াল লেনদেন নম্বর শুধুমাত্র <strong className="font-bold text-amber-950 underline underline-offset-2">01302-239137</strong> (পার্সোনাল) ও <strong className="font-bold text-amber-950 underline underline-offset-2">01726-573014</strong> (পেমেন্ট)। প্রতারণা এড়াতে অন্য কোনো নম্বরে বা অপরিচিত ব্যক্তির কাছে টাকা পাঠাবেন না।
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            সব একাউন্ট ({PAYMENT_METHODS.filter(p => p.id !== 'cash').length})
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mobile'
                ? 'bg-[#D12053] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            📱 মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট, উপায়)
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            🏛️ বাংলাদেশ ব্যাংকিং (ইসলামী ব্যাংক ও ডাচ-বাংলা)
          </button>
        </div>

        {/* 1. Mobile Banking Section */}
        {(activeTab === 'all' || activeTab === 'mobile') && (
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#D12053]" />
              <h3 className="text-lg font-extrabold text-slate-900">
                মোবাইল ব্যাংকিং (Mobile Banking)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mobileMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`bg-white rounded-2xl border ${pm.borderClass} p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xs shadow-xs"
                          style={{ backgroundColor: pm.themeColor }}
                        >
                          {pm.id.includes('bkash') ? 'বিকাশ' : pm.id === 'nagad' ? 'নগদ' : pm.id === 'rocket' ? 'রকেট' : 'উপায়'}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{pm.nameBn}</h4>
                          <span className="text-[10px] text-slate-500 block">{pm.accountTypeBn}</span>
                        </div>
                      </div>

                      {pm.badgeText && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {pm.badgeText}
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-500 font-semibold block">মোবাইল নম্বর:</span>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-slate-900 tracking-wider tabular-nums font-mono">
                          {pm.formattedNumber}
                        </span>
                        <button
                          onClick={() => handleCopy(pm.accountNumber, pm.id)}
                          className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg text-white transition-colors cursor-pointer"
                          style={{ backgroundColor: pm.themeColor }}
                          title="নম্বর কপি করুন"
                        >
                          {copiedKey === pm.id ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>কপি!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>কপি</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-0.5">
                        হিসাবধারী: <strong>{pm.accountHolderBn}</strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pm.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-mono font-semibold">
                      {pm.id === 'bkash_personal' || pm.id === 'bkash_payment' ? '*247#' : pm.id === 'nagad' ? '*167#' : pm.id === 'rocket' ? '*322#' : '*268#'}
                    </span>
                    {onOpenOrderModal ? (
                      <button
                        onClick={onOpenOrderModal}
                        className="text-xs font-bold hover:underline inline-flex items-center gap-1"
                        style={{ color: pm.themeColor }}
                      >
                        <span>অর্ডার ও পে করুন</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি ${pm.nameBn} দিয়ে বাচ্চার পেমেন্ট করতে চাই।`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold hover:underline inline-flex items-center gap-1"
                        style={{ color: pm.themeColor }}
                      >
                        <span>পেমেন্ট পাঠান</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Bangladesh Banking Section */}
        {(activeTab === 'all' || activeTab === 'bank') && (
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-800" />
              <h3 className="text-lg font-extrabold text-slate-900">
                বাংলাদেশ ব্যাংকিং (Bangladesh Banking)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bankMethods.map((pm) => (
                <div
                  key={pm.id}
                  className={`bg-white rounded-2xl border ${pm.borderClass} p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs"
                          style={{ backgroundColor: pm.themeColor }}
                        >
                          <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{pm.nameBn}</h4>
                          <span className="text-xs text-slate-500 block">{pm.bankName}</span>
                        </div>
                      </div>

                      {pm.badgeText && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {pm.badgeText}
                        </span>
                      )}
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                      <div>
                        <span className="text-[11px] text-slate-500 font-semibold block">হিসাবের নাম (Account Name):</span>
                        <span className="text-sm font-extrabold text-slate-900 block font-mono">
                          {pm.accountHolderBn}
                        </span>
                        <span className="text-xs text-slate-600 block">{pm.accountTypeBn}</span>
                      </div>

                      <div className="pt-2 border-t border-slate-200/80">
                        <span className="text-[11px] text-slate-500 font-semibold block">অ্যাকাউন্ট নম্বর (Account Number):</span>
                        <div className="flex items-center justify-between">
                          <span className="text-base sm:text-lg font-black text-slate-900 tracking-wider font-mono">
                            {pm.formattedNumber}
                          </span>
                          <button
                            onClick={() => handleCopy(pm.accountNumber, pm.id)}
                            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-colors cursor-pointer"
                            style={{ backgroundColor: pm.themeColor }}
                            title="অ্যাকাউন্ট নম্বর কপি করুন"
                          >
                            {copiedKey === pm.id ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>কপি!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>কপি করুন</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="pt-1 text-xs text-slate-600 flex flex-wrap justify-between gap-1">
                        <span>শাখা: <strong>{pm.branchName}</strong></span>
                        {pm.routingNumber && (
                          <span>রাউটিং: <strong className="font-mono">{pm.routingNumber}</strong></span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pm.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Cellfin / i-Banking / NPSB ট্রান্সফার</span>
                    {onOpenOrderModal ? (
                      <button
                        onClick={onOpenOrderModal}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>এই একাউন্টে বুকিং দিন</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={`tel:${CONTACT_INFO.rawPhone}`}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
                      >
                        <span>ব্যাংক তথ্য সহায়তা</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advance Booking Policy & Workflow for Hatchery */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5 text-emerald-700" />
            <span>হ্যাচারি বাচ্চার পেমেন্ট ও অগ্রিম বুকিং পলিসি</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                ১
              </div>
              <h4 className="font-bold text-sm text-slate-900">বাচ্চার জাত ও পরিমাণ নির্ধারণ</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                আমাদের ওয়েবসাইটের অর্ডার ক্যালকুলেটর থেকে আপনার পছন্দের হাঁস বা মুরগির বাচ্চার জাত ও পরিমাণ নির্বাচন করুন।
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                ২
              </div>
              <h4 className="font-bold text-sm text-slate-900">২০% - ৩০% অগ্রিম বুকিং টোকেন</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ইনকিউবেটরে ডিম বসানো ও হ্যাচিং স্লট নিশ্চিত করতে বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে অগ্রিম প্রদান করে TrxID বুকিং ফর্মে জমা দিন।
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                ৩
              </div>
              <h4 className="font-bold text-sm text-slate-900">ডেলিভারির সময় বাকি টাকা</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                হ্যাচারি কাউন্টারে সুস্থ ও চনমনে বাচ্চা সরাসরি গ্রহণ করার সময় অথবা জেলা কুরিয়ার পয়েন্ট থেকে বুঝে নিয়ে বাকি টাকা পরিশোধ করুন।
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
