import React, { useState, useMemo } from 'react';
import { Search, Plus, Info, LayoutGrid, Table as TableIcon, AlertCircle, Sparkles, Feather } from 'lucide-react';
import { ALL_BREEDS, DUCK_BREEDS, CHICKEN_BREEDS, FANCY_CHICKEN_BREEDS } from '../data/hatcheryData';
import { BreedItem, CategoryType } from '../types/hatchery';

interface PriceCatalogProps {
  onAddToCart: (breed: BreedItem, quantity?: number) => void;
  onSelectBreed: (breed: BreedItem) => void;
}

export const PriceCatalog: React.FC<PriceCatalogProps> = ({ onAddToCart, onSelectBreed }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [addedToast, setAddedToast] = useState<string | null>(null);

  const filteredBreeds = useMemo(() => {
    return ALL_BREEDS.filter(item => {
      // Category match
      if (activeCategory === 'duck' && item.category !== 'duck') return false;
      if (activeCategory === 'chicken' && (item.category !== 'chicken' || item.purpose === 'fancy')) return false;
      if (activeCategory === 'fancy' && item.purpose !== 'fancy') return false;
      if (activeCategory === 'egg' && item.purpose !== 'egg' && item.purpose !== 'dual') return false;
      if (activeCategory === 'meat' && item.purpose !== 'meat' && item.purpose !== 'dual') return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesNameBn = item.nameBn.toLowerCase().includes(query);
        const matchesNameEn = item.nameEn.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesNameBn || matchesNameEn || matchesDesc;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (breed: BreedItem) => {
    onAddToCart(breed, breed.minOrder || 20);
    setAddedToast(`${breed.nameBn} কার্টে যোগ করা হয়েছে!`);
    setTimeout(() => setAddedToast(null), 2500);
  };

  return (
    <section id="breeds" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Toast notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <span>রাবেয়া হ্যাচারি ক্যাটালগ</span>
            <span aria-hidden="true">·</span>
            <span>পাইকারি ও খুচরা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            বাচ্চার জাত ও হালনাগাদ মূল্যতালিকা
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            প্রতিটি বাচ্চা হ্যাচারির অভিজ্ঞ তত্ত্বাবধানে ইনকিউবেটরে প্রস্ফুটিত এবং পূর্ণ সুস্থতা নিশ্চিত করে খামারির কাছে হস্তান্তর করা হয়।
          </p>
        </div>

        {/* View Switcher buttons (interactive control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>কার্ড ভিউ</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>মূল্যতালিকা টেবিল</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="py-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            সব জাত ({ALL_BREEDS.length})
          </button>
          <button
            onClick={() => setActiveCategory('duck')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'duck'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            হাঁসের বাচ্চা ({DUCK_BREEDS.length})
          </button>
          <button
            onClick={() => setActiveCategory('chicken')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'chicken'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            খামারি মুরগি ({CHICKEN_BREEDS.length})
          </button>
          <button
            onClick={() => setActiveCategory('fancy')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'fancy'
                ? 'bg-purple-700 text-white'
                : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            <span>সৌখিন মুরগি ({FANCY_CHICKEN_BREEDS.length})</span>
          </button>
          <button
            onClick={() => setActiveCategory('egg')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'egg'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ডিমের জন্য সেরা
          </button>
          <button
            onClick={() => setActiveCategory('meat')}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'meat'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            মাংসের জন্য সেরা
          </button>
        </div>

        {/* Search input */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="জাত বা নাম খুঁজুন (যেমন: খাকি, বেইজিং)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBreeds.map((breed) => (
            <div
              key={breed.id}
              className="bg-white rounded-xl border border-slate-200/90 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-emerald-300"
            >
              {/* Product Image */}
              <div className="relative h-44 bg-slate-100 overflow-hidden group">
                <img
                  src={breed.image}
                  alt={breed.nameBn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  {breed.purpose === 'fancy' ? '✨ সৌখিন মুরগি' : breed.category === 'duck' ? 'হাঁস' : 'খামারি মুরগি'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {breed.nameBn}
                    </h3>
                    <div className="text-base font-extrabold text-emerald-800 tabular-nums">
                      ৳ {breed.price}
                      <span className="text-[11px] font-normal text-slate-500 ml-1">/পিস</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {breed.description}
                  </p>
                </div>

                {/* Subtle unboxed metadata */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{breed.eggCapacity || breed.meatWeight || breed.harvestTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>ন্যূনতম {breed.minOrder} পিস</span>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onSelectBreed(breed)}
                    className="w-full inline-flex items-center justify-center gap-1 py-2 px-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>বিস্তারিত</span>
                  </button>

                  <button
                    onClick={() => handleAdd(breed)}
                    className="w-full inline-flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>অর্ডারে নিন</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View (Authentic pricing table matching user request) */}
      {viewMode === 'table' && (
        <div id="price-table" className="space-y-8">
          
          {/* Duck Price Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 bg-emerald-50/50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  🦆 হাঁসের বাচ্চার হালনাগাদ মূল্যতালিকা
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  উন্নত জাতের ১ দিন বয়সী সুস্থ ও টিকা উপযোগী হাঁসের বাচ্চা
                </p>
              </div>
              <span className="text-xs text-slate-500">
                {DUCK_BREEDS.length} টি জাত
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 text-xs font-semibold uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">হাঁসের জাত ও ছবি</th>
                    <th className="py-3 px-4">উদ্দেশ্য / বিশেষত্ব</th>
                    <th className="py-3 px-4 text-right">প্রতি পিস দাম</th>
                    <th className="py-3 px-4 sm:px-6 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DUCK_BREEDS.map((breed) => (
                    <tr key={breed.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onSelectBreed(breed)}
                            className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 hover:border-emerald-500 shrink-0 cursor-pointer shadow-2xs group"
                            title="বড় ছবি ও বিস্তারিত দেখুন"
                          >
                            <img
                              src={breed.image}
                              alt={breed.nameBn}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => onSelectBreed(breed)}
                              className="text-left font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                            >
                              {breed.nameBn}
                            </button>
                            <div className="text-xs font-normal text-slate-400">
                              {breed.nameEn}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {breed.eggCapacity || breed.meatWeight}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-800 tabular-nums">
                        ৳ {breed.price}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleAdd(breed)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>অর্ডার করুন</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chicken Price Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 bg-amber-50/40 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  🐔 মুরগির বাচ্চার হালনাগাদ মূল্যতালিকা
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  ব্রয়লার, সোনালি, লেয়ার ও খাঁটি দেশি ১ দিন বয়সী গ্রেড-এ মুরগির বাচ্চা
                </p>
              </div>
              <span className="text-xs text-slate-500">
                {CHICKEN_BREEDS.length} টি জাত
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 text-xs font-semibold uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">মুরগির জাত ও ছবি</th>
                    <th className="py-3 px-4">উদ্দেশ্য / বিশেষত্ব</th>
                    <th className="py-3 px-4 text-right">প্রতি পিস দাম</th>
                    <th className="py-3 px-4 sm:px-6 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CHICKEN_BREEDS.map((breed) => (
                    <tr key={breed.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onSelectBreed(breed)}
                            className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 hover:border-emerald-500 shrink-0 cursor-pointer shadow-2xs group"
                            title="বড় ছবি ও বিস্তারিত দেখুন"
                          >
                            <img
                              src={breed.image}
                              alt={breed.nameBn}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => onSelectBreed(breed)}
                              className="text-left font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                            >
                              {breed.nameBn}
                            </button>
                            <div className="text-xs font-normal text-slate-400">
                              {breed.nameEn}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {breed.eggCapacity || breed.meatWeight || breed.harvestTime}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-800 tabular-nums">
                        ৳ {breed.price}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleAdd(breed)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>অর্ডার করুন</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fancy Chicken Price Table */}
          <div className="bg-white rounded-xl border border-purple-200 overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 bg-purple-50/70 border-b border-purple-200 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Feather className="w-5 h-5 text-purple-700" />
                  <span>✨ সৌখিন ও প্রদর্শনীর মুরগির বাচ্চার হালনাগাদ মূল্যতালিকা</span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  সিল্কি, ব্রহ্মা, পোলিশ ক্যাপ, সেব্রাইট ও কাদাকনাথ জাতের সুস্থ খাঁটি রক্তের সৌখিন বাচ্চা
                </p>
              </div>
              <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                {FANCY_CHICKEN_BREEDS.length} টি সৌখিন জাত
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 text-xs font-semibold uppercase border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 sm:px-6">সৌখিন জাত ও ছবি</th>
                    <th className="py-3 px-4">সৌখিন বৈশিষ্ট্য / পালক রূপ</th>
                    <th className="py-3 px-4 text-right">প্রতি পিস দাম</th>
                    <th className="py-3 px-4 sm:px-6 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {FANCY_CHICKEN_BREEDS.map((breed) => (
                    <tr key={breed.id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="py-3 px-4 sm:px-6 font-semibold text-slate-900">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onSelectBreed(breed)}
                            className="relative w-12 h-12 rounded-lg overflow-hidden border border-purple-200 hover:border-purple-500 shrink-0 cursor-pointer shadow-2xs group"
                            title="বড় ছবি ও বিস্তারিত দেখুন"
                          >
                            <img
                              src={breed.image}
                              alt={breed.nameBn}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          </button>
                          <div>
                            <button
                              type="button"
                              onClick={() => onSelectBreed(breed)}
                              className="text-left font-bold text-slate-900 hover:text-purple-700 transition-colors cursor-pointer"
                            >
                              {breed.nameBn}
                            </button>
                            <div className="text-xs font-normal text-slate-400">
                              {breed.nameEn}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">
                        {breed.meatWeight || breed.harvestTime}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-purple-900 tabular-nums">
                        ৳ {breed.price}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleAdd(breed)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 rounded-md transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>অর্ডার করুন</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Official Notice from prompt */}
      <div className="mt-8 p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">
            জরুরি দ্রষ্টব্য / নোট:
          </p>
          <p className="text-amber-800 leading-relaxed">
            বাচ্চার বয়স, পরিমাণ, জাত ও বর্তমান বাজার পরিস্থিতি অনুযায়ী দাম কিছুটা পরিবর্তিত হতে পারে। অর্ডারের পূর্বে আমাদের সাথে ফোনে বা হোয়াটসঅ্যাপে যোগাযোগ করে বর্তমান প্রকৃত দর ও মজুত জেনে নেওয়ার অনুরোধ রইল।
          </p>
        </div>
      </div>

    </section>
  );
};
