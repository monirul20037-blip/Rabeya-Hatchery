import React, { useState } from 'react';
import { Trash2, Plus, Minus, MessageSquare, Phone, CheckSquare, Truck, Package, Sparkles } from 'lucide-react';
import { CartItem, BreedItem } from '../types/hatchery';
import { CONTACT_INFO, ALL_BREEDS } from '../data/hatcheryData';

interface OrderCalculatorProps {
  cart: CartItem[];
  onUpdateQuantity: (breedId: string, quantity: number) => void;
  onRemoveItem: (breedId: string) => void;
  onClearCart: () => void;
  onOpenBookingModal: () => void;
  onAddQuickBreed: (breed: BreedItem) => void;
}

export const OrderCalculator: React.FC<OrderCalculatorProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenBookingModal,
  onAddQuickBreed,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'courier' | 'special_van'>('courier');
  const [customerDistrict, setCustomerDistrict] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Calculations
  const totalBirds = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.breed.price, 0);

  // Standard chick transport box: ~80 to 100 chicks per carton
  const estimatedCartons = totalBirds > 0 ? Math.ceil(totalBirds / 90) : 0;

  // Delivery estimate
  let deliveryEstimateText = 'বিনামূল্যে (সরাসরি হ্যাচারি কাউন্টার)';
  let estimatedDeliveryCost = 0;
  if (deliveryMethod === 'courier') {
    estimatedDeliveryCost = estimatedCartons * 250; // standard approx carton delivery charge
    deliveryEstimateText = `আনুমানিক ৳ ${estimatedDeliveryCost.toLocaleString()} (কুরিয়ার চার্জ গন্তব্যে পরিশোধযোগ্য)`;
  } else if (deliveryMethod === 'special_van') {
    deliveryEstimateText = 'দূরত্ব ও জ্বালানি আলোচনা সাপেক্ষে নির্ধারিত হবে';
  }

  // Generate WhatsApp message text
  const generateWhatsAppMessage = () => {
    let msg = `আসসালামু আলাইকুম রাবেয়া হ্যাচারি,\n\n`;
    msg += `আমি বাচ্চার অর্ডার সম্পর্কে আলোচনা করতে চাই:\n`;
    msg += `------------------------------------\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. ${item.breed.nameBn}: ${item.quantity} পিস (দর: ৳${item.breed.price}) = ৳${(item.quantity * item.breed.price).toLocaleString()}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `সর্বমোট বাচ্চার সংখ্যা: ${totalBirds} পিস\n`;
    msg += `আনুমানিক বাচ্চার মূল্য: ৳${subtotal.toLocaleString()}\n`;
    if (estimatedCartons > 0) {
      msg += `প্রয়োজনীয় বাচ্চার কার্টন: প্রায় ${estimatedCartons} টি\n`;
    }
    msg += `ডেলিভারি মাধ্যম: ${
      deliveryMethod === 'pickup'
        ? 'হ্যাচারি থেকে সরাসরি গ্রহণ'
        : deliveryMethod === 'courier'
        ? 'কুরিয়ার সার্ভিস ডেলিভারি'
        : 'বিশেষ পিকআপ ভ্যান'
    }\n`;
    if (customerDistrict.trim()) {
      msg += `আমার জেলা/উপজেলা: ${customerDistrict}\n`;
    }
    if (customerNotes.trim()) {
      msg += `বিশেষ নোট: ${customerNotes}\n`;
    }
    msg += `\nদয়া করে বাচ্চার বর্তমান প্রাপ্যতা, সঠিক ডেলিভারি তারিখ ও চূড়ান্ত মূল্য নিশ্চিত করবেন।`;
    return encodeURIComponent(msg);
  };

  return (
    <section id="order-calculator" className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>সরাসরি পাইকারি ও খুচরা অর্ডার</span>
            <span aria-hidden="true">·</span>
            <span>দ্রুত হিসাব</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            অর্ডার ও খরচ ক্যালকুলেটর
          </h2>
          <p className="text-sm text-slate-600">
            আপনার খামারের চাহিদা অনুযায়ী বাচ্চার জাত ও পরিমাণ নির্ধারণ করুন। মোট মূল্য ও কার্টনের হিসাব স্বয়ংক্রিয়ভাবে দেখে সরাসরি অর্ডার পাঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Order Items List & Quick Breed Adder */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    নির্বাচিত বাচ্চার তালিকা ({cart.length})
                  </h3>
                  {totalBirds > 0 && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 tabular-nums">
                      মোট {totalBirds} পিস
                    </span>
                  )}
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={onClearCart}
                    className="text-xs text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  >
                    তালিকা খালি করুন
                  </button>
                )}
              </div>

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="p-8 text-center space-y-3">
                  <p className="text-sm text-slate-500">
                    বর্তমানে কোনো বাচ্চার জাত নির্বাচিত নেই।
                  </p>
                  <p className="text-xs text-slate-400">
                    নিচের জনপ্রিয় তালিকা থেকে এক ক্লিকেই জাত যুক্ত করুন অথবা উপরের ক্যাটালগ থেকে পছন্দ করুন:
                  </p>
                  {/* Quick Add Buttons */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    {ALL_BREEDS.slice(0, 4).map((b) => (
                      <button
                        key={b.id}
                        onClick={() => onAddQuickBreed(b)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-emerald-600" />
                        <span>{b.nameBn} (৳{b.price})</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.breed.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.breed.image}
                          alt={item.breed.nameBn}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {item.breed.nameBn}
                          </h4>
                          <div className="text-xs text-slate-500">
                            দর: ৳ {item.breed.price} প্রতি পিস
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                          <button
                            onClick={() => onUpdateQuantity(item.breed.id, Math.max(10, item.quantity - 10))}
                            className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min="10"
                            step="10"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.breed.id, Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-14 text-center text-xs font-bold text-slate-800 tabular-nums focus:outline-none"
                          />
                          <button
                            onClick={() => onUpdateQuantity(item.breed.id, item.quantity + 10)}
                            className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line Total */}
                        <div className="text-right min-w-[80px]">
                          <span className="text-sm font-black text-slate-900 tabular-nums">
                            ৳ {(item.quantity * item.breed.price).toLocaleString()}
                          </span>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.breed.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add more breed selector */}
              {cart.length > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-medium">আরো জাত যোগ করতে চান?</span>
                  <div className="flex flex-wrap gap-1.5">
                    {ALL_BREEDS.filter(b => !cart.some(c => c.breed?.id === b.id)).slice(0, 3).map((b) => (
                      <button
                        key={b.id}
                        onClick={() => onAddQuickBreed(b)}
                        className="px-2.5 py-1 font-medium bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-md transition-colors cursor-pointer"
                      >
                        + {b.nameBn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Delivery Method Selector */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>ডেলিভারি মাধ্যম নির্বাচন করুন</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900">নিজস্ব পিকআপ</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">উল্লাপাড়া হ্যাচারি কাউন্টার</div>
                </label>

                <label
                  onClick={() => setDeliveryMethod('courier')}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    deliveryMethod === 'courier'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900">কুরিয়ার সার্ভিস</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">সুন্দরবন / করতোয়া / এজেআর</div>
                </label>

                <label
                  onClick={() => setDeliveryMethod('special_van')}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    deliveryMethod === 'special_van'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-slate-900">বিশেষ পিকআপ ভ্যান</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">বাল্ক বা বড় লটের জন্য সরাসরি</div>
                </label>
              </div>

              {/* Optional District note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    আপনার জেলা ও উপজেলার নাম:
                  </label>
                  <input
                    type="text"
                    value={customerDistrict}
                    onChange={(e) => setCustomerDistrict(e.target.value)}
                    placeholder="যেমন: পাবনা সদর, নাটোর, বা বগুড়া..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    বিশেষ অনুরোধ বা তারিখ (যদি থাকে):
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="যেমন: আগামী সপ্তাহের সোমবার ডেলিভারি..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Estimated Summary & Direct Action Card */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-6">
              
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">
                  অর্ডার সারসংক্ষেপ ও বুকিং
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  রাবেয়া হ্যাচারি সরাসরি বুকিং হিসাব
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>মোট বাচ্চার সংখ্যা:</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {totalBirds} পিস
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    <span>আনুমানিক কার্টন সংখ্যা:</span>
                  </span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {estimatedCartons > 0 ? `${estimatedCartons} টি কার্টন` : '০'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span>ডেলিভারি ধরন:</span>
                  <span className="font-medium text-slate-900">
                    {deliveryMethod === 'pickup' ? 'হ্যাচারি কাউন্টার' : deliveryMethod === 'courier' ? 'কুরিয়ার' : 'বিশেষ পিকআপ'}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-bold text-slate-900 block">আনুমানিক মোট মূল্য:</span>
                      <span className="text-[11px] text-slate-400">বাজারদর অনুযায়ী সামান্য পরিবর্তন হতে পারে</span>
                    </div>
                    <span className="text-2xl font-black text-emerald-800 tabular-nums">
                      ৳ {subtotal.toLocaleString()}
                    </span>
                  </div>

                  {subtotal > 0 && (
                    <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1 text-xs mt-2">
                      <div className="flex justify-between text-emerald-950 font-semibold">
                        <span>বুকিং অগ্রিম (প্রায় ২০%):</span>
                        <span className="tabular-nums font-bold">
                          ৳ {Math.max(500, Math.round(subtotal * 0.20)).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600 text-[11px]">
                        <span>ডেলিভারির সময় বাকি:</span>
                        <span className="tabular-nums">
                          ৳ {Math.max(0, subtotal - Math.max(500, Math.round(subtotal * 0.20))).toLocaleString()}
                        </span>
                      </div>
                      <div className="pt-1 border-t border-emerald-200/60 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-800 font-medium">বিকাশ / নগদ / ব্যাংক মারফত প্রদেয়</span>
                        <a href="#payment-gateway" className="font-bold text-emerald-700 hover:text-emerald-900 underline">
                          একাউন্ট নম্বর →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                
                {/* 1. Primary: Online Booking & Payment Form */}
                <button
                  onClick={onOpenBookingModal}
                  disabled={cart.length === 0}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white transition-all shadow-md ${
                    cart.length > 0
                      ? 'bg-emerald-700 hover:bg-emerald-800 cursor-pointer shadow-emerald-700/25 hover:shadow-lg'
                      : 'bg-slate-300 cursor-not-allowed opacity-75'
                  }`}
                >
                  <CheckSquare className="w-4 h-4 text-emerald-300" />
                  <span>অর্ডার কনফার্ম ও পেমেন্ট করুন</span>
                </button>

                {/* 2. Send WhatsApp Order */}
                <a
                  href={cart.length > 0 ? `${CONTACT_INFO.whatsappUrl}?text=${generateWhatsAppMessage()}` : '#'}
                  target={cart.length > 0 ? "_blank" : "_self"}
                  rel="noreferrer"
                  onClick={(e) => {
                    if (cart.length === 0) {
                      e.preventDefault();
                      alert('দয়া করে প্রথমে কোনো বাচ্চার জাত ও পরিমাণ যোগ করুন!');
                    }
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                    cart.length > 0
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100 cursor-pointer shadow-2xs'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700" />
                  <span>হোয়াটসঅ্যাপে অর্ডার পাঠান</span>
                </a>

                {/* 3. Direct Phone Call */}
                <a
                  href={`tel:${CONTACT_INFO.rawPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-600 hover:text-emerald-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>সরাসরি কল: {CONTACT_INFO.phone}</span>
                </a>

              </div>

              {/* Trust statement */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center leading-relaxed">
                রাবেয়া হ্যাচারি শতভাগ সুস্থ বাচ্চার নিশ্চয়তা প্রদান করে। অর্ডার নিশ্চিতকরণের পর সঠিক সময়ে ডেলিভারি সম্পন্ন করা হয়।
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
