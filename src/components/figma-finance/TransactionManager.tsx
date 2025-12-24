'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from 'date-fns';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Transaction } from "@/lib/types";
import { PlusCircle, MinusCircle, List, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  source: z.string().min(2, {
    message: "Source/Category must be at least 2 characters.",
  }),
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
});

interface TransactionManagerProps {
    onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    transactions: Transaction[];
}

export default function TransactionManager({ onAddTransaction, transactions }: TransactionManagerProps) {
  const { toast } = useToast();

  const incomeForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { source: "", amount: 0, },
  });

  const expenseForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { source: "", amount: 0, },
  });

  function onIncomeSubmit(values: z.infer<typeof formSchema>) {
    onAddTransaction({ type: 'income', ...values });
    incomeForm.reset();
    toast({ title: "Income Added", description: `${values.source}: $${values.amount}` });
  }

  function onExpenseSubmit(values: z.infer<typeof formSchema>) {
    onAddTransaction({ type: 'expense', ...values });
    expenseForm.reset();
    toast({ title: "Expense Added", description: `${values.source}: $${values.amount}` });
  }

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Transaction Manager</CardTitle>
            <CardDescription>Log your income and expenses to keep your finances in check.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="income">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="income"><PlusCircle className="mr-2 h-4 w-4"/>Add Income</TabsTrigger>
                    <TabsTrigger value="expense"><MinusCircle className="mr-2 h-4 w-4"/>Add Expense</TabsTrigger>
                    <TabsTrigger value="list"><List className="mr-2 h-4 w-4"/>View All</TabsTrigger>
                </TabsList>
                <TabsContent value="income">
                    <Card>
                        <CardHeader>
                            <CardTitle>Log New Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...incomeForm}>
                                <form onSubmit={incomeForm.handleSubmit(onIncomeSubmit)} className="space-y-4">
                                    <FormField
                                    control={incomeForm.control}
                                    name="source"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Income Source</FormLabel>
                                            <FormControl><Input placeholder="e.g., Figma Project" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={incomeForm.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl><Input type="number" placeholder="e.g., 2500" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit">Add Income</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="expense">
                     <Card>
                        <CardHeader>
                            <CardTitle>Log New Expense</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...expenseForm}>
                                <form onSubmit={expenseForm.handleSubmit(onExpenseSubmit)} className="space-y-4">
                                    <FormField
                                    control={expenseForm.control}
                                    name="source"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Expense Category</FormLabel>
                                            <FormControl><Input placeholder="e.g., Software" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={expenseForm.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl><Input type="number" placeholder="e.g., 99" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit" variant="destructive">Add Expense</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="list">
                    <Card>
                        <CardHeader>
                            <CardTitle>Transaction History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-72">
                                <div className="space-y-4">
                                    {sortedTransactions.length > 0 ? sortedTransactions.map((t, index) => (
                                        <div key={t.id}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    {t.type === 'income' ? <ArrowUpCircle className="h-5 w-5 text-accent" /> : <ArrowDownCircle className="h-5 w-5 text-destructive" />}
                                                    <div>
                                                        <p className="font-medium">{t.source}</p>
                                                        <p className="text-sm text-muted-foreground">{format(new Date(t.date), 'PPP')}</p>
                                                    </div>
                                                </div>
                                                <p className={`font-semibold ${t.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                                                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                                                </p>
                                            </div>
                                            {index < transactions.length - 1 && <Separator className="my-2" />}
                                        </div>
                                    )) : (
                                      <p className="text-center text-muted-foreground py-10">No transactions yet.</p>
                                    )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  )
}
