import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Plus, Minus, ShoppingBag } from 'lucide-react';
import { BreedItem } from '../types/hatchery';

interface BreedDetailModalProps {
  breed: BreedItem | null;
  onClose: () => void;
  onAddToCart: (breed: BreedItem, quantity: number) => void;
}

export const BreedDetailModal: React.FC<BreedDetailModalProps> = ({ breed, onClose, onAddToCart }) => {
  if (!breed) return null;

  const [quantity, setQuantity] = useState<number>(breed.minOrder || 50);

  const handleIncrement = () => setQuantity(prev => prev + 10);
  const handleDecrement = () => setQuantity(prev => Math.max(breed.minOrder || 10, prev - 10));

  const handleConfirmAdd = () => {
    onAddToCart(breed, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 bg-slate-100">
          <img
            src={breed.image}
            alt={breed.nameBn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded">
            {breed.category === 'duck' ? '🦆 হাঁসের বাচ্চা' : '🐔 মুরগির বাচ্চা'}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          
          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {breed.nameBn}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {breed.nameEn} · {breed.age}
              </p>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-800 tabular-nums">
              ৳ {breed.price} <span className="text-xs font-normal text-slate-500">/প্রতি পিস</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {breed.description}
          </p>

          {/* Key Metric Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl text-xs">
            {breed.eggCapacity && (
              <div>
                <span className="text-slate-500 block">ডিম উৎপাদন:</span>
                <span className="font-semibold text-slate-900">{breed.eggCapacity}</span>
              </div>
            )}
            {breed.meatWeight && (
              <div>
                <span className="text-slate-500 block">গড় ওজন:</span>
                <span className="font-semibold text-slate-900">{breed.meatWeight}</span>
              </div>
            )}
            {breed.harvestTime && (
              <div>
                <span className="text-slate-500 block">বিক্রি/উৎপাদন সময়:</span>
                <span className="font-semibold text-slate-900">{breed.harvestTime}</span>
              </div>
            )}
          </div>

          {/* Breed Advantages */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              জাতের প্রধান বৈশিষ্ট্যসমূহ
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {breed.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Care Advice */}
          <div className="space-y-2 p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-emerald-700" />
              <span>রাবেয়া হ্যাচারির বিশেষ পালন পরামর্শ</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-950 list-disc list-inside">
              {breed.careTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector & Cost Preview */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-700">পরিমাণ (পিস):</span>
              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                <button
                  onClick={handleDecrement}
                  className="p-2 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-16 text-center text-sm font-bold text-slate-900 focus:outline-none tabular-nums"
                />
                <button
                  onClick={handleIncrement}
                  className="p-2 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block">আনুমানিক উপমোট:</span>
              <span className="text-lg font-black text-emerald-800 tabular-nums">
                ৳ {(quantity * breed.price).toLocaleString()}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
          <button
            onClick={handleConfirmAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>অর্ডার তালিকায় যোগ করুন ({quantity} পিস)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
