'use client';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Car,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  Home,
  Landmark,
  MessageSquare,
  MoreHorizontal,
  PersonStanding,
  PieChart,
  Target,
  User,
  Wallet,
  TrendingUp,
  TrendingDown,
  FileText,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  Pie as RechartsPie,
  PieChart as RechartsPieChart,
  Cell,
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import Image from 'next/image';
import { useMemo, useState, useTransition } from 'react';
import { getDashboardInsights } from '@/app/actions';
import type { Insights } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const incomeSourceData = [
  { name: 'E-commerce', value: 2100 },
  { name: 'Google Adsense', value: 950 },
  { name: 'My Shop', value: 8000 },
  { name: 'Salary', value: 13000 },
];

const incomeAndExpensesData = [
  { month: 'Jan', income: 10000, expenses: 8000 },
  { month: 'Feb', income: 12000, expenses: 9000 },
  { month: 'Mar', income: 15000, expenses: 11000 },
  { month: 'Apr', income: 18000, expenses: 16000 },
  { month: 'May', income: 14000, expenses: 10000 },
  { month: 'Jun', income: 16000, expenses: 12000 },
  { month: 'Jul', income: 17000, expenses: 13000 },
  { month: 'Aug', income: 19000, expenses: 14000 },
  { month: 'Sep', income: 21000, expenses: 15000 },
  { month: 'Oct', income: 20000, expenses: 17000 },
  { month: 'Nov', income: 22000, expenses: 18000 },
  { month: 'Dec', income: 25000, expenses: 20000 },
];

const assetsData = [
    { name: 'Gold', value: 15700, color: '#facc15' },
    { name: 'Stock', value: 22500, color: '#4ade80' },
    { name: 'Warehouse', value: 120000, color: '#60a5fa' },
    { name: 'Land', value: 135000, color: '#c084fc' },
];

const spendingData = [
    { category: 'Housing', amount: 3452, icon: Home, color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
    { category: 'Personal', amount: 2200, icon: PersonStanding, color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
    { category: 'Transportation', amount: 2190, icon: Car, color: 'text-orange-400', bgColor: 'bg-orange-500/20' },
];


export default function Dashboard() {
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  const [insights, setInsights] = useState<Insights | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalIncome = useMemo(() => incomeAndExpensesData.reduce((acc, item) => acc + item.income, 0), []);
  const totalExpenses = useMemo(() => incomeAndExpensesData.reduce((acc, item) => acc + item.expenses, 0), []);
  const availableBalance = totalIncome - totalExpenses;
  const netWorth = useMemo(() => assetsData.reduce((acc, item) => acc + item.value, 0), []);
  const incomeGoal = 39276;
  const incomeGoalProgress = Math.round((totalIncome / incomeGoal) * 100);

  const handleGenerateInsights = () => {
    startTransition(async () => {
      const incomeForInsights = incomeSourceData.map(item => ({ source: item.name, amount: item.value }));
      const expendituresForInsights = spendingData.map(item => ({ category: item.category, amount: item.amount }));
      
      const result = await getDashboardInsights({
        income: incomeForInsights,
        expenditures: expendituresForInsights,
        budget: 30000,
      });

      if (result.success && result.data) {
        setInsights(result.data);
      } else {
        console.error(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-auto items-center gap-4 border-b bg-background p-4 sm:px-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Personal Finance Tracker</h1>
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <p className="text-3xl font-bold text-blue-400">${availableBalance.toLocaleString()}</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline">Dashboard</Button>
          <Button variant="ghost">Spreadsheet</Button>
          <div className="text-sm text-muted-foreground hidden md:block">{currentDate}</div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/seed/user/40/40" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Simon K. Jimmy</p>
              <p className="text-xs text-muted-foreground">
                Mortgage consultant
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="col-span-1 bg-gradient-to-br from-pink-500 to-orange-400">
            <CardHeader>
              <CardTitle>Total Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${netWorth.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Spendings</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={incomeAndExpensesData.map(d => ({ v: d.expenses }))}>
                  <Line type="monotone" dataKey="v" stroke="#f43f5e" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalIncome.toLocaleString()}</div>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={incomeAndExpensesData.map(d => ({ v: d.income }))}>
                  <Line type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Income Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{incomeGoalProgress}%</span>
                <span className="text-sm text-muted-foreground">
                  ${totalIncome.toLocaleString()} / ${incomeGoal.toLocaleString()}
                </span>
              </div>
              <Progress value={incomeGoalProgress} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Progress to month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Income Source</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={incomeSourceData} layout="vertical" margin={{left:10}}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--foreground))'}}/>
                  <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.1)'}} contentStyle={{backgroundColor: 'hsl(var(--card))'}} />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Income & Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={incomeAndExpensesData}>
                  <XAxis dataKey="month" tick={{fill: 'hsl(var(--foreground))'}}/>
                  <YAxis tick={{fill: 'hsl(var(--foreground))'}}/>
                  <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--card))'}} />
                  <Line type="monotone" dataKey="income" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-5))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Spendings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {spendingData.map(item => (
                        <div key={item.category} className="flex items-center">
                            <div className={`rounded-lg ${item.bgColor} p-2 mr-4`}>
                                <item.icon className={item.color} />
                            </div>
                            <div className="flex-grow">{item.category}</div>
                            <div className="font-semibold">${item.amount.toLocaleString()}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={150}>
                        <RechartsPieChart>
                            <RechartsPie data={assetsData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60}>
                                {assetsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </RechartsPie>
                            <RechartsTooltip contentStyle={{backgroundColor: 'hsl(var(--card))'}} />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                     <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                        {assetsData.map(asset => (
                            <div key={asset.name} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{backgroundColor: asset.color}}/>
                                <span>{asset.name}</span>
                                <span className="ml-auto font-semibold">${asset.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 text-yellow-400"/>
                        AI Financial Insights
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isPending ? (
                       <div className="space-y-4">
                           <Skeleton className="h-4 w-3/4" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-1/2" />
                       </div>
                    ) : insights ? (
                        <div className="space-y-4 text-sm">
                            <div>
                                <h3 className="font-semibold flex items-center"><FileText className="mr-2 h-4 w-4" /> Summary</h3>
                                <p className="text-muted-foreground">{insights.summary}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold flex items-center"><Lightbulb className="mr-2 h-4 w-4" /> Insights</h3>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    {insights.insights.map((insight, i) => <li key={i}>{insight}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h3 className="font-semibold flex items-center"><Target className="mr-2 h-4 w-4" /> Recommendations</h3>
                                <ul className="list-disc pl-5 text-muted-foreground">
                                    {insights.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                </ul>
                            </div>
                        </div>
                    ) : (
                       <div className="text-center">
                         <p className="mb-4">Get AI-powered insights on your financial health.</p>
                         <Button onClick={handleGenerateInsights} disabled={isPending}>
                            {isPending ? 'Generating...' : 'Generate Insights'}
                        </Button>
                       </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
