import React, { useState } from 'react';
import { X, CheckCircle2, MessageSquare, Phone, Package, Send, CreditCard, Copy, Check, ShieldCheck, Wallet } from 'lucide-react';
import { CartItem, OrderBooking, PaymentMethodType } from '../types/hatchery';
import { CONTACT_INFO, PAYMENT_METHODS } from '../data/hatcheryData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (order: OrderBooking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'courier' | 'special_van'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('bkash_personal');
  const [advanceAmount, setAdvanceAmount] = useState<number>(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity * item.breed.price, 0);
    return Math.max(500, Math.round(total * 0.20));
  });
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderBooking | null>(null);

  const totalBirds = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.breed.price, 0);
  const selectedPaymentInfo = PAYMENT_METHODS.find(m => m.id === paymentMethod) || PAYMENT_METHODS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !district.trim()) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং জেলা উল্লেখ করুন।');
      return;
    }

    const bookingId = `RH-${Date.now().toString().slice(-6)}`;
    const newOrder: OrderBooking = {
      id: bookingId,
      customerName,
      phone,
      district,
      upazila,
      address,
      items: cart.map(c => ({
        breedId: c.breed.id,
        breedName: c.breed.nameBn,
        quantity: c.quantity,
        price: c.breed.price
      })),
      totalAmount: subtotal,
      deliveryType,
      paymentMethod,
      advanceAmount: paymentMethod !== 'cash' ? Number(advanceAmount) || 0 : 0,
      trxId: trxId.trim() || undefined,
      senderNumberOrAcc: senderNumber.trim() || undefined,
      notes,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Save to local state
    setConfirmedOrder(newOrder);
    setIsSubmitted(true);
    onOrderSuccess(newOrder);
  };

  const getWhatsAppMessageForConfirmedOrder = () => {
    if (!confirmedOrder) return '';
    let msg = `আসসালামু আলাইকুম রাবেয়া হ্যাচারী,\n`;
    msg += `আমি ওয়েবসাইটে অনলাইন বাচ্চার বুকিং ও পেমেন্ট তথ্য পাঠিয়েছি।\n\n`;
    msg += `📋 বুকিং আইডি: ${confirmedOrder.id}\n`;
    msg += `👤 কাস্টমার: ${confirmedOrder.customerName}\n`;
    msg += `📞 ফোন: ${confirmedOrder.phone}\n`;
    msg += `📍 জেলা: ${confirmedOrder.district}, ${confirmedOrder.upazila || ''}\n`;
    msg += `🏠 ঠিকানা: ${confirmedOrder.address || 'কুরিয়ার পয়েন্ট'}\n`;
    msg += `🚚 ডেলিভারি: ${
      confirmedOrder.deliveryType === 'pickup'
        ? 'সরাসরি হ্যাচারি থেকে গ্রহণ'
        : confirmedOrder.deliveryType === 'courier'
        ? 'কুরিয়ার সার্ভিস'
        : 'বিশেষ পিকআপ ভ্যান'
    }\n\n`;
    msg += `🐣 বাচ্চার তালিকা:\n`;
    confirmedOrder.items.forEach((item, idx) => {
      msg += `  ${idx + 1}. ${item.breedName}: ${item.quantity} পিস (৳${(item.quantity * item.price).toLocaleString()})\n`;
    });
    msg += `\n💰 মোট বাচ্চার মূল্য: ৳${confirmedOrder.totalAmount.toLocaleString()}\n`;
    
    if (confirmedOrder.paymentMethod) {
      const pm = PAYMENT_METHODS.find(p => p.id === confirmedOrder.paymentMethod);
      msg += `💳 পেমেন্ট মাধ্যম: ${pm?.nameBn || confirmedOrder.paymentMethod}\n`;
      if (confirmedOrder.advanceAmount && confirmedOrder.advanceAmount > 0) {
        msg += `💵 অগ্রিম পরিশোধ: ৳${confirmedOrder.advanceAmount.toLocaleString()}\n`;
        msg += `⏳ ডেলিভারির সময় বাকি: ৳${Math.max(0, confirmedOrder.totalAmount - confirmedOrder.advanceAmount).toLocaleString()}\n`;
      }
      if (confirmedOrder.trxId) {
        msg += `🔢 ট্রানজেকশন আইডি (TrxID): ${confirmedOrder.trxId}\n`;
      }
      if (confirmedOrder.senderNumberOrAcc) {
        msg += `📱 প্রেরক নম্বর/অ্যাকাউন্ট: ${confirmedOrder.senderNumberOrAcc}\n`;
      }
    }

    if (confirmedOrder.notes) {
      msg += `📝 নোট: ${confirmedOrder.notes}\n`;
    }
    msg += `\nদয়া করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ।`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        
        {/* Header */}
        <div className="p-5 bg-emerald-800 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {isSubmitted ? 'অর্ডার বুকিং সম্পন্ন হয়েছে!' : 'রাবেয়া হ্যাচারি - অনলাইন বাচ্চার বুকিং'}
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5">
              {isSubmitted ? 'আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে' : 'আপনার সঠিক তথ্য দিয়ে দ্রুত বাচ্চার বুকিং নিশ্চিত করুন'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Items Summary Pill */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              {totalBirds > 0 && (
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>অর্ডারকৃত বাচ্চার পরিমাণ:</span>
                  <span className="tabular-nums text-emerald-700">{totalBirds} পিস</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                <span>সর্বমোট বাচ্চার আনুমানিক মূল্য:</span>
                <span className="font-bold text-slate-900 tabular-nums">৳ {subtotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  আপনার পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="যেমন: মোঃ আব্দুল্লাহ"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  মোবাইল নম্বর (সচল ও হোয়াটসঅ্যাপ যুক্ত) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="যেমন: 017xxxxxxxx"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 tabular-nums"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    জেলার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="যেমন: পাবনা / সিরাজগঞ্জ"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    উপজেলার নাম
                  </label>
                  <input
                    type="text"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    placeholder="যেমন: উল্লাপাড়া"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  গ্রাম বা কুরিয়ার পয়েন্টের পূর্ণাঙ্গ ঠিকানা
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: গ্রাম: রূপপুর, পোস্ট: ঈশ্বরদী, সুন্দরবন কুরিয়ার শাখা..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ডেলিভারি মাধ্যম
                </label>
                <select
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="courier">কুরিয়ার সার্ভিস ডেলিভারি (সুন্দরবন / করতোয়া)</option>
                  <option value="pickup">সরাসরি হ্যাচারি থেকে গ্রহণ (উল্লাপাড়া)</option>
                  <option value="special_van">বিশেষ পিকআপ ভ্যান ডেলিভারি (বাল্ক অর্ডার)</option>
                </select>
              </div>

              {/* Payment Gateway & Method Selection */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                    <span>পেমেন্ট পদ্ধতি ও অগ্রিম বুকিং *</span>
                  </label>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    নিরাপদ ও অনুমোদিত
                  </span>
                </div>

                {/* Method selector pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PAYMENT_METHODS.map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-2 rounded-xl text-xs font-semibold border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs ring-2 ring-emerald-500/25'
                          : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <span className="text-[14px]">
                        {pm.id === 'bkash_personal'
                          ? '🌸 বিকাশ (Personal)'
                          : pm.id === 'bkash_payment'
                          ? '🛍️ বিকাশ (Payment)'
                          : pm.id === 'nagad'
                          ? '🔥 নগদ'
                          : pm.id === 'rocket'
                          ? '🟣 রকেট'
                          : pm.id === 'upay'
                          ? '🔵 উপায়'
                          : pm.id === 'islami_bank'
                          ? '🏛️ ইসলামী ব্যাংক'
                          : pm.id === 'dbbl_agent'
                          ? '🏦 ডাচ-বাংলা এজেন্ট'
                          : '💵 ক্যাশ'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono font-medium truncate max-w-full">
                        {pm.formattedNumber.slice(0, 14)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selected Method Details */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2.5 text-xs shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 font-medium">নির্বাচিত একাউন্ট: </span>
                      <strong className="text-slate-900">{selectedPaymentInfo.nameBn}</strong>
                    </div>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                      {selectedPaymentInfo.accountTypeBn}
                    </span>
                  </div>

                  {/* Account Number & Copy Button */}
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-500 font-semibold block">
                      {selectedPaymentInfo.category === 'bank' ? 'ব্যাংক একাউন্ট নম্বর:' : 'মোবাইল ব্যাংকিং নম্বর:'}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-black text-slate-900 tracking-wider font-mono">
                        {selectedPaymentInfo.formattedNumber}
                      </span>
                      {paymentMethod !== 'cash' && (
                        <button
                          type="button"
                          onClick={() => handleCopy(selectedPaymentInfo.accountNumber, selectedPaymentInfo.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer shadow-2xs"
                          style={{ backgroundColor: selectedPaymentInfo.themeColor }}
                        >
                          {copiedKey === selectedPaymentInfo.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>কপি হয়েছে!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>নম্বর কপি</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 pt-0.5 flex flex-wrap items-center justify-between gap-1">
                      <span>হিসাবের নাম: <strong>{selectedPaymentInfo.accountHolderBn}</strong></span>
                      {selectedPaymentInfo.bankName && (
                        <span>শাখা: <strong>{selectedPaymentInfo.branchName}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Advance Amount & Presets */}
                  {paymentMethod !== 'cash' && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-slate-700">
                          অগ্রিম পরিশোধের পরিমাণ (৳):
                        </label>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <button
                            type="button"
                            onClick={() => setAdvanceAmount(Math.max(500, Math.round(subtotal * 0.20)))}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded border border-slate-200 cursor-pointer font-semibold"
                          >
                            ২০% অগ্রিম (৳{Math.max(500, Math.round(subtotal * 0.20)).toLocaleString()})
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdvanceAmount(subtotal)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded border border-slate-200 cursor-pointer font-semibold"
                          >
                            ১০০% সম্পূর্ণ
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <input
                            type="number"
                            value={advanceAmount}
                            onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                            min={0}
                            max={subtotal}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono font-bold text-slate-900"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">
                            ডেলিভারিতে বকেয়া: <strong className="text-slate-800 font-mono">৳ {Math.max(0, subtotal - (advanceAmount || 0)).toLocaleString()}</strong>
                          </span>
                        </div>

                        <div>
                          <input
                            type="text"
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value)}
                            placeholder="TrxID (যেমন: 9J38DX77A)"
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 uppercase font-mono font-bold text-slate-900"
                          />
                          <span className="text-[10px] text-slate-500 block mt-1">
                            টাকা পাঠানোর পর প্রাপ্ত Transaction ID (TrxID)
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          যে মোবাইল নম্বর বা ব্যাংক অ্যাকাউন্ট থেকে টাকা পাঠিয়েছেন (ঐচ্ছিক)
                        </label>
                        <input
                          type="text"
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          placeholder="যেমন: 017xxxxxxxx বা ব্যাংক অ্যাকাউন্ট"
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* Cash Notice */}
                  {paymentMethod === 'cash' && (
                    <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 space-y-1">
                      <p className="font-bold">হ্যাচারি কাউন্টার ক্যাশ নিয়মাবলী:</p>
                      <p className="text-amber-800">
                        ইনকিউবেটরে ডিম বসানো ও হ্যাচিং নিশ্চিত করতে ২০% অগ্রিম বিকাশ বা নগদে প্রদান প্রযোজ্য হতে পারে। অবশিষ্ট টাকা উল্লাপাড়া হ্যাচারিতে সুস্থ বাচ্চা বুঝে নেওয়ার সময় পরিশোধ করবেন।
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  কোনো মন্তব্য বা ডেলিভারির পছন্দের তারিখ (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="যেমন: আগামী সোমবার সকালে পৌঁছালে ভালো হয়"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>বুকিং জমা দিন</span>
              </button>
            </div>

          </form>
        ) : (
          /* Success Screen */
          <div className="p-6 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900">
                ধন্যবাদ, {confirmedOrder?.customerName}!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                আপনার বুকিং আইডি: <span className="font-bold text-emerald-800 tabular-nums">{confirmedOrder?.id}</span>
              </p>
            </div>

            {/* Booking & Payment Summary Card */}
            {confirmedOrder && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between pb-1 border-b border-slate-200 text-slate-700">
                  <span className="font-semibold">পেমেন্ট মাধ্যম:</span>
                  <span className="font-bold text-slate-900">
                    {PAYMENT_METHODS.find(p => p.id === confirmedOrder.paymentMethod)?.nameBn || 'ক্যাশ'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>মোট বাচ্চার মূল্য:</span>
                  <span className="font-bold tabular-nums">৳ {confirmedOrder.totalAmount.toLocaleString()}</span>
                </div>
                {confirmedOrder.advanceAmount && confirmedOrder.advanceAmount > 0 ? (
                  <>
                    <div className="flex justify-between text-emerald-800">
                      <span className="font-semibold">অগ্রিম পরিশোধ:</span>
                      <span className="font-bold tabular-nums">৳ {confirmedOrder.advanceAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-amber-900 pt-1 border-t border-slate-200/60 font-semibold">
                      <span>ডেলিভারির সময় বাকি:</span>
                      <span className="font-bold tabular-nums">
                        ৳ {Math.max(0, confirmedOrder.totalAmount - confirmedOrder.advanceAmount).toLocaleString()}
                      </span>
                    </div>
                  </>
                ) : null}
                {confirmedOrder.trxId && (
                  <div className="flex justify-between pt-1 border-t border-slate-200/60 text-slate-600 font-mono text-[11px]">
                    <span>TrxID:</span>
                    <span className="font-bold text-slate-800">{confirmedOrder.trxId}</span>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
              আমাদের হ্যাচারি পরিচালক মোঃ মনিরুল ইসলাম (মোহন) আপনার সাথে দ্রুত ফোনে যোগাযোগ করবেন। আপনি নিচের বাটনে ক্লিক করে সাথে সাথেই এই বুকিং তথ্য ও পেমেন্ট প্রুফ হোয়াটসঅ্যাপে পাঠাতে পারেন:
            </p>

            <div className="space-y-2.5 pt-2">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${getWhatsAppMessageForConfirmedOrder()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে বুকিং ও পেমেন্ট প্রুফ পাঠান (০১৩০২-২৩৯১৩৭)</span>
              </a>

              <a
                href={`${CONTACT_INFO.whatsappSecondaryUrl}?text=${getWhatsAppMessageForConfirmedOrder()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>বিকল্প হোয়াটসঅ্যাপে পাঠান (০১৭২৬-৫৭৩০১৪)</span>
              </a>

              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                <a href={`tel:${CONTACT_INFO.rawPhone}`} className="hover:text-emerald-700 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>কল: {CONTACT_INFO.phone}</span>
                </a>
                <span className="text-slate-300">|</span>
                <a href={`tel:${CONTACT_INFO.rawPhoneSecondary}`} className="hover:text-emerald-700 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>কল: {CONTACT_INFO.phoneSecondary}</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                উইন্ডো বন্ধ করুন
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
