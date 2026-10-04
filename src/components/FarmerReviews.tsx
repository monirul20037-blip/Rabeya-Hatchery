import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/hatcheryData';

export const FarmerReviews: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <span>সফল খামারিদের অভিজ্ঞতা</span>
            <span aria-hidden="true">·</span>
            <span>গ্রাহক সন্তুষ্টি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            খামারি ভাইদের বিশ্বস্ত মতামত
          </h2>
          <p className="text-sm text-slate-600">
            আমাদের কাছ থেকে বাচ্চা সংগ্রহ করে যারা সফলভাবে খামার পরিচালনা করছেন তাদের বাস্তব প্রতিক্রিয়া।
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors"
            >
              <div className="space-y-3">
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Farmer Info */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <div className="text-sm font-bold text-slate-900">
                  {review.name}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{review.location}</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-700">
                  সংগ্রহ: {review.breedBought}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
