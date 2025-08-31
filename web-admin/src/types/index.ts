// =========================
// Shared Core
// =========================
export interface Store {
  id: string;
  name: string;
  type: string; // "sale" | "rental"
}

export interface Item {
  id: string;
  storeId: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
}

export interface Transaction {
  id: string;
  storeId: string;
  customerName: string;
  type: string; // "sale" | "rental" | "preorder"
  totalPrice: number;
  status: string;
  date: string;
}

export interface TransactionItem {
  id: string;
  transactionId: string;
  itemId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Payment {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  paymentDate: string;
}

// =========================
// Shoes-specific
// =========================
export interface SupplierOrder {
  id: string;
  transactionItemId: string;
  supplierName: string;
  supplierPrice: number;
  orderDate: string;
  receivedDate: string;
  status: string;
}

// =========================
// Rentals-specific
// =========================
export interface RentalPricing {
  id: string;
  itemId: string;
  duration: string; // "daily" | "weekly" | "monthly"
  rate: number;
}

export interface RentalDetail {
  id: string;
  transactionItemId: string;
  startDate: string;
  endDate: string;
  returnDate: string;
  ratePerDay: number;
  deposit: number;
}

// =========================
// Cashflow & Expenses
// =========================
export interface CashFlow {
  id: string;
  storeId: string;
  type: string; // "inflow" | "outflow"
  source: string; // "transaction" | "payment" | "supplier" | "expense" | "refund" | "deposit"
  sourceId: string;
  amount: number;
  method: string;
  date: string;
  note: string;
}

export interface Expense {
  id: string;
  storeId: string;
  category: string; // "rent" | "utilities" | "marketing" | etc.
  amount: number;
  method: string;
  date: string;
  note: string;
}
