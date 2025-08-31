import { db } from './db';

// --- Helper ---
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function seedDatabase() {
  const now = () => new Date().toISOString();

  // Create stores
  const stores = Array.from({ length: 2 }).map((_, i) =>
    db.store.create({
      name: `Store ${i + 1}`,
      type: i % 2 === 0 ? 'sale' : 'rental',
    })
  );

  // Create items
  const items = stores.flatMap((store) =>
    Array.from({ length: 5 }).map((_, i) =>
      db.item.create({
        storeId: store.id,
        name: `Item ${store.name}-${i + 1}`,
        category: randomChoice(['shoes', 'equipment', 'accessory']),
        basePrice: 100 + i * 10,
        description: `Description for item ${i + 1}`,
      })
    )
  );

  // Transactions + transaction items + payments + cashflows
  const transactions = items.flatMap((item, i) => {
    const txn = db.transaction.create({
      storeId: item.storeId,
      customerName: `Customer ${i + 1}`,
      type: randomChoice(['sale', 'rental', 'preorder']),
      totalPrice: item.basePrice * 2,
      status: randomChoice(['pending', 'completed']),
      date: now(),
    });

    const tItem = db.transactionItem.create({
      transactionId: txn.id,
      itemId: item.id,
      quantity: 2,
      unitPrice: item.basePrice,
      lineTotal: item.basePrice * 2,
    });

    // --- Payment + CashFlow inflow ---
    const payment = db.payment.create({
      transactionId: txn.id,
      amount: txn.totalPrice,
      method: randomChoice(['cash', 'gcash', 'bank']),
      paymentDate: now(),
    });

    db.cashFlow.create({
      storeId: txn.storeId,
      type: 'inflow',
      source: 'payment',
      sourceId: payment.id,
      amount: payment.amount,
      method: payment.method,
      date: payment.paymentDate,
      note: `Payment from ${txn.customerName}`,
    });

    // --- Supplier Order (linked to transaction item) ---
    const supplierOrder = db.supplierOrder.create({
      transactionItemId: tItem.id,
      supplierName: `Supplier ${i + 1}`,
      supplierPrice: item.basePrice * 0.7,
      orderDate: now(),
      receivedDate: undefined,
      status: randomChoice(['ordered', 'shipped', 'received']),
    });

    // CashFlow outflow for supplier order
    db.cashFlow.create({
      storeId: txn.storeId,
      type: 'outflow',
      source: 'supplier',
      sourceId: supplierOrder.id,
      amount: supplierOrder.supplierPrice,
      method: 'bank',
      date: supplierOrder.orderDate,
      note: `Payment to ${supplierOrder.supplierName}`,
    });

    return txn;
  });

  // Expenses + cashflow outflows
  const expenses = Array.from({ length: 5 }).map((_, i) => {
    const expense = db.expense.create({
      storeId: randomChoice(stores).id,
      category: randomChoice(['rent', 'utilities', 'marketing']),
      amount: 200 + i * 50,
      method: randomChoice(['cash', 'gcash']),
      date: now(),
      note: `Expense ${i + 1}`,
    });

    db.cashFlow.create({
      storeId: expense.storeId,
      type: 'outflow',
      source: 'expense',
      sourceId: expense.id,
      amount: expense.amount,
      method: expense.method,
      date: expense.date,
      note: expense.note,
    });

    return expense;
  });

  return { stores, items, transactions, expenses };
}
