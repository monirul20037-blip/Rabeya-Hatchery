import React, { useState } from 'react';
import { Calculator, TrendingUp, HelpCircle, CheckCircle2 } from 'lucide-react';

type FarmModel = 'khaki_egg' | 'sonali_meat' | 'broiler_meat' | 'beijing_meat';

export const ProfitPlanner: React.FC = () => {
  const [model, setModel] = useState<FarmModel>('khaki_egg');
  const [birdCount, setBirdCount] = useState<number>(300);

  // Model-specific parameters (based on Bangladeshi market metrics)
  const calculateEstimates = () => {
    switch (model) {
      case 'khaki_egg': {
        // Khaki Campbell Egg Farm (5-6 months rearing to start laying, 1 year laying period)
        const chickCost = birdCount * 35;
        const feedToLaying = birdCount * 9 * 55; // ~9 kg feed till egg production at ৳55/kg
        const medicineVaccine = birdCount * 30; // ৳30 per bird
        const totalInvestmentToLaying = chickCost + feedToLaying + medicineVaccine;
        
        // Annual Egg Output (average 260 eggs per bird surviving ~95%)
        const survivingBirds = Math.round(birdCount * 0.95);
        const annualEggs = survivingBirds * 260;
        const eggPrice = 13.5; // ৳13.5 per egg average
        const annualEggRevenue = annualEggs * eggPrice;
        
        // Feed during laying period: ~120g daily per bird = 43.8 kg per year * ৳50/kg
        const annualLayingFeed = survivingBirds * 43.8 * 50;
        const netEstimatedAnnualProfit = annualEggRevenue - (annualLayingFeed + (medicineVaccine * 1.5));

        return {
          cycleName: 'খাকি ক্যাম্বেল হাঁসের ডিমের খামার (বাৎসরিক প্রজেক্ট)',
          chickCost,
          feedCost: feedToLaying,
          medicineCost: medicineVaccine,
          totalInitialInvestment: totalInvestmentToLaying,
          grossRevenue: annualEggRevenue,
          projectedNetProfit: Math.round(netEstimatedAnnualProfit),
          roiPercentage: Math.round((netEstimatedAnnualProfit / (totalInvestmentToLaying + annualLayingFeed)) * 100),
          notes: 'প্রতিটি খাকি ক্যাম্বেল হাঁস বছরে ২৫০-৩০০টি ডিম দেয়। প্রাকৃতিক মুক্ত চারণে খাদ্য খরচ ৪০% পর্যন্ত কমানো সম্ভব।'
        };
      }

      case 'sonali_meat': {
        // Sonali Meat Farm (65-70 days batch, ~850g - 1kg average body weight)
        const chickCost = birdCount * 45;
        const feedCost = birdCount * 2.2 * 68; // 2.2 kg feed per bird at ৳68/kg
        const medicineCost = birdCount * 18;
        const totalCost = chickCost + feedCost + medicineCost;
        
        const survivingBirds = Math.round(birdCount * 0.96);
        const avgWeight = 0.9; // 900 grams
        const totalLiveKg = survivingBirds * avgWeight;
        const marketRatePerKg = 290; // ৳290 per kg live wholesale rate
        const grossRevenue = totalLiveKg * marketRatePerKg;
        const netProfit = grossRevenue - totalCost;

        return {
          cycleName: 'সোনালি মুরগির খামার (৬৫-৭০ দিনের মাংস ব্যাচ)',
          chickCost,
          feedCost,
          medicineCost,
          totalInitialInvestment: totalCost,
          grossRevenue,
          projectedNetProfit: Math.round(netProfit),
          roiPercentage: Math.round((netProfit / totalCost) * 100),
          notes: 'বছরে ৪ থেকে ৫টি ব্যাচ করা সম্ভব। সোনালি মাংসের বাজারে সারাবছরই স্থিতিশীল চাহিদা থাকে।'
        };
      }

      case 'broiler_meat': {
        // Broiler Farm (32-35 days batch, ~2.0 kg body weight)
        const chickCost = birdCount * 60;
        const feedCost = birdCount * 3.0 * 70; // 3.0 kg feed at ৳70/kg
        const medicineCost = birdCount * 15;
        const totalCost = chickCost + feedCost + medicineCost;

        const survivingBirds = Math.round(birdCount * 0.95);
        const avgWeight = 2.0; // 2.0 kg
        const totalLiveKg = survivingBirds * avgWeight;
        const marketRatePerKg = 185; // ৳185 per kg
        const grossRevenue = totalLiveKg * marketRatePerKg;
        const netProfit = grossRevenue - totalCost;

        return {
          cycleName: 'বাণিজ্যিক ব্রয়লার খামার (৩৫ দিনের দ্রুত ব্যাচ)',
          chickCost,
          feedCost,
          medicineCost,
          totalInitialInvestment: totalCost,
          grossRevenue,
          projectedNetProfit: Math.round(netProfit),
          roiPercentage: Math.round((netProfit / totalCost) * 100),
          notes: 'সবচেয়ে দ্রুত নগদ অর্থ প্রত্যাবর্তনের ব্যবস্থা। বছরে ৬টি ব্যাচ সফলভাবে পরিচালনা করা যায়।'
        };
      }

      case 'beijing_meat': {
        // Beijing / Pekin Duck (50-60 days batch, ~3.0 kg body weight)
        const chickCost = birdCount * 120;
        const feedCost = birdCount * 5.8 * 60; // 5.8 kg feed at ৳60/kg
        const medicineCost = birdCount * 20;
        const totalCost = chickCost + feedCost + medicineCost;

        const survivingBirds = Math.round(birdCount * 0.97);
        const avgWeight = 3.0; // 3.0 kg
        const totalLiveKg = survivingBirds * avgWeight;
        const marketRatePerKg = 250; // ৳250 per kg
        const grossRevenue = totalLiveKg * marketRatePerKg;
        const netProfit = grossRevenue - totalCost;

        return {
          cycleName: 'বেইজিং / পেকিন ব্রয়লার হাঁস (৫০-৬০ দিনের ব্যাচ)',
          chickCost,
          feedCost,
          medicineCost,
          totalInitialInvestment: totalCost,
          grossRevenue,
          projectedNetProfit: Math.round(netProfit),
          roiPercentage: Math.round((netProfit / totalCost) * 100),
          notes: 'বেইজিং হাঁসের দৈহিক বৃদ্ধি অত্যন্ত দ্রুত। বিয়েবাড়ি ও শহরের হোটেল-রেস্টুরেন্টে চড়া মূল্যে বিক্রি হয়।'
        };
      }
    }
  };

  const results = calculateEstimates();

  return (
    <section id="profit-planner" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-2 mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
          <span>নতুন উদ্যোক্তা ও খামারি সহায়তা</span>
          <span aria-hidden="true">·</span>
          <span>বিনিয়োগ ক্যালকুলেটর</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          খামারি লাভ-লোকসান ও সম্ভাব্য বিনিয়োগ হিসাব
        </h2>
        <p className="text-sm text-slate-600">
          "ছোট পরিসরে শুরু করে ধীরে ধীরে খামার সম্প্রসারণ করুন।" আপনার পরিকল্পনা অনুযায়ী বাচ্চার সংখ্যা নির্বাচন করে সম্ভাব্য আয়-ব্যয়ের বাস্তবসম্মত ধারণা নিন।
        </p>
      </div>

      {/* Calculator Body */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Model Selector Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            খামারের ধরন ও উদ্দেশ্য নির্বাচন করুন:
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => setModel('khaki_egg')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                model === 'khaki_egg'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs sm:text-sm">🦆 খাকি ক্যাম্বেল হাঁস</div>
              <div className="text-[11px] text-slate-500 font-normal">ডিম উৎপাদন মডেল</div>
            </button>

            <button
              onClick={() => setModel('sonali_meat')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                model === 'sonali_meat'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs sm:text-sm">🐔 সোনালি মুরগি</div>
              <div className="text-[11px] text-slate-500 font-normal">৬৫-৭০ দিনের মাংস ব্যাচ</div>
            </button>

            <button
              onClick={() => setModel('broiler_meat')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                model === 'broiler_meat'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs sm:text-sm">🐔 ব্রয়লার মুরগি</div>
              <div className="text-[11px] text-slate-500 font-normal">৩৫ দিনের ফাস্ট মাংস ব্যাচ</div>
            </button>

            <button
              onClick={() => setModel('beijing_meat')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                model === 'beijing_meat'
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-1 ring-emerald-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-xs sm:text-sm">🦆 বেইজিং/পেকিন হাঁস</div>
              <div className="text-[11px] text-slate-500 font-normal">উচ্চ ওজনের মাংসের জাত</div>
            </button>
          </div>
        </div>

        {/* Inputs and Results Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls: Bird Count Slider & Quick Presets */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900">
                  বাচ্চার সংখ্যা (Flock Size):
                </label>
                <span className="text-lg font-black text-emerald-800 tabular-nums">
                  {birdCount} পিস
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={birdCount}
                onChange={(e) => setBirdCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />

              {/* Quick Presets */}
              <div className="flex items-center gap-2 pt-1">
                {[100, 300, 500, 1000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setBirdCount(preset)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer tabular-nums ${
                      birdCount === preset
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {preset} পিস
                  </button>
                ))}
              </div>
            </div>

            {/* Practical Advice based on selection */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>বিশেষ পরামর্শ:</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {results.notes}
              </p>
            </div>
          </div>

          {/* Results Display Board */}
          <div className="lg:col-span-7 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>{results.cycleName}</span>
              </h4>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                সম্ভাব্য লাভজনক
              </span>
            </div>

            {/* Financial Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3 bg-white rounded-lg border border-slate-100">
                <span className="text-slate-500 block">বাচ্চা ক্রয় বাবদ খরচ:</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  ৳ {results.chickCost.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-100">
                <span className="text-slate-500 block">আনুমানিক খাদ্য খরচ:</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  ৳ {results.feedCost.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-100">
                <span className="text-slate-500 block">টিকা, ওষুধ ও লিটার ব্যবস্থাপনা:</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  ৳ {results.medicineCost.toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-100">
                <span className="text-slate-500 block">মোট আনুমানিক বিক্রয়মূল্য:</span>
                <span className="text-base font-bold text-slate-900 tabular-nums">
                  ৳ {results.grossRevenue.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Net Estimated Profit Box */}
            <div className="p-4 bg-emerald-800 text-white rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-200 block uppercase tracking-wider font-medium">
                  সম্ভাব্য নীট মুনাফা (Net Profit)
                </span>
                <span className="text-xl sm:text-2xl font-black tabular-nums">
                  ৳ {results.projectedNetProfit.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-200 block">আনুমানিক মার্জিন:</span>
                <span className="text-lg font-bold text-amber-300 tabular-nums">
                  ~ {results.roiPercentage}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              * নোট: খাদ্য ও ডিম/মাংসের বাজারদরের ওঠানামা, খামারির পরিচর্যা দক্ষতা ও মৌসুমী পরিবর্তনের ওপর ভিত্তি করে প্রকৃত লাভ পরিবর্তিত হতে পারে।
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
