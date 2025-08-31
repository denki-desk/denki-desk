import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { seedDatabase } from '../seed';

// --- Seed initial data ---
if (db.item.getAll().length === 0) {
  seedDatabase();
}

// --- Handlers ---
export const handlers = [
  // Items
  http.get('/items', () => {
    const items = db.item.getAll();
    return HttpResponse.json(items);
  }),

  // Stores
  http.get('/stores', () => {
    const stores = db.store.getAll();
    return HttpResponse.json(stores);
  }),

  // Transactions
  http.get('/transactions', () => {
    const transactions = db.transaction.getAll();
    return HttpResponse.json(transactions);
  }),

  // Payments
  http.get('/payments', () => {
    const payments = db.payment.getAll();
    return HttpResponse.json(payments);
  }),

  // Cashflow
  http.get('/cashflow', () => {
    const flows = db.cashFlow.getAll();
    return HttpResponse.json(flows);
  }),

  // Expenses
  http.get('/expenses', () => {
    const expenses = db.expense.getAll();
    return HttpResponse.json(expenses);
  }),
];
