/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PriceCatalog } from './components/PriceCatalog';
import { OrderCalculator } from './components/OrderCalculator';
import { PaymentGatewaySection } from './components/PaymentGatewaySection';
import { ProfitPlanner } from './components/ProfitPlanner';
import { FarmGuides } from './components/FarmGuides';
import { AboutOwner } from './components/AboutOwner';
import { FarmerReviews } from './components/FarmerReviews';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BreedDetailModal } from './components/BreedDetailModal';
import { BookingModal } from './components/BookingModal';
import { CartItem, BreedItem, OrderBooking } from './types/hatchery';
import { DUCK_BREEDS, CHICKEN_BREEDS, CONTACT_INFO } from './data/hatcheryData';
import { Phone, MessageSquare } from 'lucide-react';

export default function App() {
  // Preload initial sample cart with popular breeds for instant utility
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { breed: DUCK_BREEDS[0], quantity: 100 }, // Khaki Campbell
      { breed: CHICKEN_BREEDS[1], quantity: 100 } // Sonali Chicken
    ];
  });

  const [selectedBreedForModal, setSelectedBreedForModal] = useState<BreedItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (breed: BreedItem, quantity: number = 50) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.breed.id === breed.id);
      if (existing) {
        return prev.map((item) =>
          item.breed.id === breed.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { breed, quantity }];
    });
  };

  const handleUpdateQuantity = (breedId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(breedId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.breed.id === breedId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (breedId: string) => {
    setCart((prev) => prev.filter((item) => item.breed.id !== breedId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderSuccess = (order: OrderBooking) => {
    // Save to localStorage for farmer reference
    try {
      const existingOrders = JSON.parse(localStorage.getItem('rabeya_hatchery_orders') || '[]');
      localStorage.setItem('rabeya_hatchery_orders', JSON.stringify([order, ...existingOrders]));
    } catch (e) {
      console.error('Storage error', e);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B]">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => scrollToSection('order-calculator')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToCatalog={() => scrollToSection('breeds')}
          onOpenQuickOrder={() => scrollToSection('order-calculator')}
        />

        {/* Catalog: Breeds & Price List */}
        <PriceCatalog
          onAddToCart={handleAddToCart}
          onSelectBreed={(breed) => setSelectedBreedForModal(breed)}
        />

        {/* Interactive Order & Cost Calculator */}
        <OrderCalculator
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
          onAddQuickBreed={(breed) => handleAddToCart(breed, 50)}
        />

        {/* Official Payment Gateways: bKash, Nagad, Bank Transfer */}
        <PaymentGatewaySection
          onOpenOrderModal={() => setIsBookingModalOpen(true)}
        />

        {/* Farm Investment & Profit Planner */}
        <ProfitPlanner />

        {/* Practical Farm Guides */}
        <FarmGuides />

        {/* Proprietor & Hatchery Location */}
        <AboutOwner />

        {/* Farmer Testimonials */}
        <FarmerReviews />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Breed Detail Modal */}
      <BreedDetailModal
        breed={selectedBreedForModal}
        onClose={() => setSelectedBreedForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating Quick Action Contact for Mobile (stays within the 15% mobile sticky budget) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center gap-2 p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700">
        <a
          href={`tel:${CONTACT_INFO.rawPhone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>সরাসরি কল</span>
        </a>

        <a
          href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent('আসসালামু আলাইকুম রাবেয়া হ্যাচারি, আমি বাচ্চার অর্ডার সম্পর্কে জানতে চাই।')}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-800 hover:bg-emerald-900 text-emerald-100 rounded-xl text-xs font-bold transition-colors border border-emerald-700"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
          <span>হোয়াটসঅ্যাপ</span>
        </a>
      </div>

    </div>
  );
}
