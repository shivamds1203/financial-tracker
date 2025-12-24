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

export default function Dashboard() {
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div>
          <h1 className="text-2xl font-semibold">Personal Finance Tracker</h1>
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <p className="text-3xl font-bold text-blue-400">$14,822</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline">Dashboard</Button>
          <Button variant="ghost">Spreadsheet</Button>
          <div className="text-sm text-muted-foreground">{currentDate}</div>
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
              <p className="text-4xl font-bold">$278,378</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Spendings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$9,228</div>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={[{v:0}, {v:5}, {v:3}, {v:8}, {v:4}]}>
                  <Line type="monotone" dataKey="v" stroke="#f43f5e" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,050</div>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={[{v:0}, {v:5}, {v:3}, {v:8}, {v:4}]}>
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
                <span className="text-2xl font-bold">61%</span>
                <span className="text-sm text-muted-foreground">
                  $24,050 / 39,276
                </span>
              </div>
              <Progress value={61} className="mt-2 h-2" />
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
                  <Bar dataKey="value" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={20} />
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
                  <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Spendings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center">
                        <div className="rounded-lg bg-purple-500/20 p-2 mr-4">
                           <Home className="text-purple-400" />
                        </div>
                        <div className="flex-grow">Housing</div>
                        <div className="font-semibold">$3,452</div>
                    </div>
                    <div className="flex items-center">
                        <div className="rounded-lg bg-pink-500/20 p-2 mr-4">
                            <PersonStanding className="text-pink-400" />
                        </div>
                        <div className="flex-grow">Personal</div>
                        <div className="font-semibold">$2,200</div>
                    </div>
                    <div className="flex items-center">
                        <div className="rounded-lg bg-orange-500/20 p-2 mr-4">
                            <Car className="text-orange-400" />
                        </div>
                        <div className="flex-grow">Transportation</div>
                        <div className="font-semibold">$2,190</div>
                    </div>
                </CardContent>
            </Card>

            <Card>
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
             <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4"/>
                            Notification
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>3 Bills are past Due. Pay soon to avoid late fees.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Expenses for My Dogs and Cats</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-between items-end">
                        <div className="space-y-2 text-sm">
                           <div className="flex justify-between"><span className="text-muted-foreground">Routine Vet</span><span className="font-semibold ml-4">140</span></div>
                           <div className="flex justify-between"><span className="text-muted-foreground">Food</span><span className="font-semibold ml-4">950</span></div>
                           <div className="flex justify-between"><span className="text-muted-foreground">Food Treats</span><span className="font-semibold ml-4">231</span></div>
                           <div className="flex justify-between"><span className="text-muted-foreground">Kennel Boarding</span><span className="font-semibold ml-4">65</span></div>
                        </div>
                        <Image src="https://picsum.photos/seed/dog/100/100" width={80} height={80} alt="dog" data-ai-hint="dog cartoon" />
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
