export type CategoryType = 'all' | 'duck' | 'chicken' | 'fancy' | 'egg' | 'meat';
export type PaymentMethodType =
  | 'bkash_personal'
  | 'bkash_payment'
  | 'nagad'
  | 'rocket'
  | 'upay'
  | 'islami_bank'
  | 'dbbl_agent'
  | 'cash';

export interface BreedItem {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'duck' | 'chicken';
  purpose: 'egg' | 'meat' | 'dual' | 'hobby' | 'fancy';
  price: number; // in BDT
  image: string;
  age: string;
  eggCapacity?: string;
  meatWeight?: string;
  fcr?: string;
  harvestTime?: string;
  description: string;
  features: string[];
  careTips: string[];
  inStock: boolean;
  minOrder: number;
}

export interface CartItem {
  breed: BreedItem;
  quantity: number;
}

export interface PaymentAccountInfo {
  id: PaymentMethodType;
  category: 'mobile' | 'bank' | 'cash';
  nameBn: string;
  nameEn: string;
  accountNumber: string;
  formattedNumber: string;
  accountTypeBn: string;
  accountHolderBn: string;
  bankName?: string;
  branchName?: string;
  routingNumber?: string;
  shortDesc: string;
  instructions: string[];
  themeColor: string;
  accentBg: string;
  borderClass: string;
  badgeText?: string;
}

export interface OrderBooking {
  id: string;
  customerName: string;
  phone: string;
  district: string;
  upazila: string;
  address: string;
  items: { breedId: string; breedName: string; quantity: number; price: number }[];
  totalAmount: number;
  deliveryType: 'pickup' | 'courier' | 'special_van';
  paymentMethod?: PaymentMethodType;
  advanceAmount?: number;
  trxId?: string;
  senderNumberOrAcc?: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed';
}

export interface FarmGuide {
  id: string;
  title: string;
  category: 'brooding' | 'feeding' | 'vaccine' | 'biosecurity';
  summary: string;
  readTime: string;
  details: string[];
  importantPoints: string[];
}

