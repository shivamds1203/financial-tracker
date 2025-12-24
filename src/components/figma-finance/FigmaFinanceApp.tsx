'use client';

import { useState } from 'react';
import type { Transaction, Forecast, Insights } from '@/lib/types';
import Header from './Header';
import SummaryDashboard from './SummaryDashboard';
import TransactionManager from './TransactionManager';
import FinancialForecasting from './FinancialForecasting';

const initialTransactions: Transaction[] = [
  { id: '1', type: 'income', source: 'Figma Project A', amount: 3500, date: new Date('2024-05-01').toISOString() },
  { id: '2', type: 'income', source: 'Client B', amount: 2000, date: new Date('2024-05-05').toISOString() },
  { id: '3', type: 'expense', source: 'Software', amount: 150, date: new Date('2024-05-02').toISOString() },
  { id: '4', type: 'expense', source: 'Hardware', amount: 800, date: new Date('2024-05-10').toISOString() },
  { id: '5', type: 'expense', source: 'Utilities', amount: 250, date: new Date('2024-05-15').toISOString() },
  { id: '6', type: 'expense', source: 'Marketing', amount: 400, date: new Date('2024-05-20').toISOString() },
];

export default function FigmaFinanceApp() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budget, setBudget] = useState<number>(4000);
  
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [insights, setInsights] = useState<Insights | null>(null);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = { 
      ...transaction, 
      id: crypto.randomUUID(), 
      date: new Date().toISOString() 
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-5 xl:grid-cols-3">
          <div className="lg:col-span-3 xl:col-span-2 space-y-6">
            <SummaryDashboard 
              transactions={transactions}
              budget={budget}
              setBudget={setBudget}
              insights={insights}
              setInsights={setInsights}
            />
            <TransactionManager onAddTransaction={addTransaction} transactions={transactions} />
          </div>
          <div className="lg:col-span-2 xl:col-span-1 space-y-6">
            <FinancialForecasting 
              transactions={transactions}
              forecast={forecast}
              setForecast={setForecast}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
