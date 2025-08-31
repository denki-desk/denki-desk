import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

export const db = factory({
  // =========================
  // Shared Core
  // =========================
  store: {
    id: primaryKey(nanoid),
    name: String,
    type: String, // 'sale' | 'rental'
  },

  item: {
    id: primaryKey(nanoid),
    storeId: String, // FK -> store.id
    name: String,
    category: String,
    basePrice: Number,
    description: String,
  },

  transaction: {
    id: primaryKey(nanoid),
    storeId: String, // FK -> store.id
    customerName: String,
    type: String, // 'sale' | 'rental' | 'preorder'
    totalPrice: Number,
    status: String,
    date: Date,
  },

  transactionItem: {
    id: primaryKey(nanoid),
    transactionId: String, // FK -> transaction.id
    itemId: String, // FK -> item.id
    quantity: Number,
    unitPrice: Number,
    lineTotal: Number,
  },

  payment: {
    id: primaryKey(nanoid),
    transactionId: String, // FK -> transaction.id
    amount: Number,
    method: String, // 'cash' | 'gcash' | 'bank' | etc.
    paymentDate: Date,
  },

  // =========================
  // Shoes / Preorder
  // =========================
  supplierOrder: {
    id: primaryKey(nanoid),
    transactionItemId: String, // FK -> transactionItem.id
    supplierName: String,
    supplierPrice: Number,
    orderDate: Date,
    receivedDate: Date,
    status: String,
  },

  // =========================
  // Rentals
  // =========================
  rentalPricing: {
    id: primaryKey(nanoid),
    itemId: String, // FK -> item.id
    duration: String, // 'daily' | 'weekly' | 'monthly'
    rate: Number,
  },

  rentalDetail: {
    id: primaryKey(nanoid),
    transactionItemId: String, // FK -> transactionItem.id
    startDate: Date,
    endDate: Date,
    returnDate: Date,
    ratePerDay: Number,
    deposit: Number,
  },

  // =========================
  // Finance / Cash Flow
  // =========================
  cashFlow: {
    id: primaryKey(nanoid),
    storeId: String, // FK -> store.id
    type: String, // 'inflow' | 'outflow'
    source: String, // 'transaction' | 'payment' | 'supplier' | 'expense' | 'refund' | 'deposit'
    sourceId: String, // nullable FK depending on source
    amount: Number,
    method: String,
    date: Date,
    note: String,
  },

  expense: {
    id: primaryKey(nanoid),
    storeId: String, // FK -> store.id
    category: String, // 'rent' | 'utilities' | 'marketing' | etc.
    amount: Number,
    method: String,
    date: Date,
    note: String,
  },
});
