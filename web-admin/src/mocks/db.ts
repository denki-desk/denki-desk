import { factory, primaryKey } from '@mswjs/data';
import { nanoid } from 'nanoid';

const models = {
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

export const db = factory(models);

export type Models = keyof typeof models;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'));

export const storeDb = (data: string) =>
  window.localStorage.setItem('msw-db', data);

export const persistDb = (model: Models) => {
  const data = loadDb();
  data[model] = db[model].getAll();
  storeDb(JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key];
    if (dataEntries) {
      dataEntries.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDb = () => {
  window.localStorage.clear();
};
