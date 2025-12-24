'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  TrendingDown,
  PlusCircle,
  MoreHorizontal,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const transactions = [
  {
    source: 'E-commerce',
    amount: 2100.5,
    date: '2024-05-15',
    type: 'income',
    status: 'Completed',
  },
  {
    source: 'Facebook Ads',
    amount: -950.0,
    date: '2024-05-14',
    type: 'expense',
    status: 'Completed',
  },
  {
    source: 'Netflix',
    amount: -15.0,
    date: '2024-05-13',
    type: 'expense',
    status: 'Completed',
  },
  { source: 'Salary', amount: 8000.0, date: '2024-05-12', type: 'income', status: 'Pending' },
];

export default function TransactionManager() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>A list of your recent transactions.</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add transaction
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <div className="mt-4 space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`mr-4 rounded-full p-2 ${
                    transaction.type === 'income'
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-red-100 dark:bg-red-900'
                  }`}
                >
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{transaction.source}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge
                    variant={
                      transaction.status === 'Completed' ? 'default' : 'secondary'
                    }
                    className={
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="ml-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
