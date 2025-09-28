import { primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

export const models = {
  // =========================
  // Shared Core
  // =========================
  store: {
    id: primaryKey(nanoid),
    name: String,
    type: String, // 'sale' | 'rental'
  },

  user: {
    id: primaryKey(nanoid),
    username: String,
    password: String, // for real backend, mock plain now
    storeId: String, // FK -> store.id
    name: String,
    role: String, // 'admin' | 'cashier' | 'staff'
    email: String,
    phone: String,
    createdAt: Date.now,
    updatedAt: Date.now,
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
    userId: String, // 🔑 FK -> user.id (who created it)
    customerName: String, // keep string for now, can upgrade to customer FK later
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
    userId: String, // 🔑 who recorded the payment
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
    userId: String, // 🔑 who logged the entry
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
    userId: String, // 🔑 who recorded expense
    category: String, // 'rent' | 'utilities' | 'marketing' | etc.
    amount: Number,
    method: String,
    date: Date,
    note: String,
  },
};
