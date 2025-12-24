'use client';

import type { Dispatch, FC, SetStateAction, useTransition } from 'react';
import React, { useMemo, useState, startTransition } from 'react';
import type { Transaction, Insights } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Landmark, Sparkles, AlertCircle, CheckCircle, PieChart as PieChartIcon, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getDashboardInsights } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


interface SummaryDashboardProps {
  transactions: Transaction[];
  budget: number;
  setBudget: Dispatch<SetStateAction<number>>;
  insights: Insights | null;
  setInsights: Dispatch<SetStateAction<Insights | null>>;
}

const SummaryDashboard: FC<SummaryDashboardProps> = ({ transactions, budget, setBudget, insights, setInsights }) => {
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const { totalIncome, totalExpenses, netSavings, expenseByCategory } = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const savings = income - expenses;
    const expByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.source] = (acc[t.source] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return { totalIncome: income, totalExpenses: expenses, netSavings: savings, expenseByCategory: expByCategory };
  }, [transactions]);

  const budgetUsage = budget > 0 ? (totalExpenses / budget) * 100 : 0;
  
  const handleGenerateInsights = () => {
    startTransition(async () => {
      const incomeForAI = transactions.filter(t => t.type === 'income').map(t => ({ source: t.source, amount: t.amount }));
      const expendituresForAI = transactions.filter(t => t.type === 'expense').map(t => ({ category: t.source, amount: t.amount }));

      const result = await getDashboardInsights({ income: incomeForAI, expenditures: expendituresForAI, budget });

      if (result.success && result.data) {
        setInsights(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Generating Insights',
          description: result.error,
        });
      }
    });
  };

  const chartData = useMemo(() => Object.entries(expenseByCategory).map(([name, value]) => ({ name, value })), [expenseByCategory]);
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Summary Dashboard</CardTitle>
        <CardDescription>An overview of your project's financial health.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4 text-center md:text-left">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">${totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${totalExpenses.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
              <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netSavings >= 0 ? 'text-primary' : 'text-destructive'}`}>
                ${netSavings.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget vs. Actual</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">$</span>
                <Input
                  type="number"
                  defaultValue={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-32 h-8"
                  aria-label="Set budget"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={budgetUsage} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Spent ${totalExpenses.toLocaleString()} of ${budget.toLocaleString()}
                </p>
                <p className={cn(
                  "text-sm font-medium flex items-center gap-2",
                  budgetUsage > 100 ? "text-destructive" : "text-primary"
                )}>
                  {budgetUsage > 100 ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  {budgetUsage > 100 ? `${(budgetUsage - 100).toFixed(1)}% over budget` : `${(100 - budgetUsage).toFixed(1)}% budget remaining`}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Expense Distribution</CardTitle>
              <PieChartIcon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" labelLine={false}>
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-[150px] text-muted-foreground text-sm">
                        No expense data to display.
                    </div>
                )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="text-accent" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>Let AI analyze your finances and provide actionable recommendations.</CardDescription>
            </CardHeader>
            <CardContent>
              {isPending ? (
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="ml-4 text-muted-foreground">Generating insights...</p>
                </div>
              ) : insights ? (
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Summary</h4>
                    <p className="text-muted-foreground">{insights.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Key Insights</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {insights.insights.map((insight, i) => <li key={i}>{insight}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {insights.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                    </ul>
                  </div>
                </div>
              ) : (
                 <div className="text-center text-muted-foreground py-4">Click the button to generate insights.</div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateInsights} disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                {insights ? 'Regenerate Insights' : 'Generate Insights'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryDashboard;
