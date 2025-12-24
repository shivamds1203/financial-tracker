'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import React from 'react';
import type { Transaction, Forecast } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { getFinancialForecast } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface FinancialForecastingProps {
  transactions: Transaction[];
  forecast: Forecast | null;
  setForecast: Dispatch<SetStateAction<Forecast | null>>;
}

const FinancialForecasting: FC<FinancialForecastingProps> = ({ transactions, forecast, setForecast }) => {
  const [isPending, startTransition] = React.useTransition();
  const [marketTrends, setMarketTrends] = React.useState('Stable market conditions with 3% annual growth in the tech sector.');
  const [assumptions, setAssumptions] = React.useState('Assuming one new major project win in the next 6 months.');
  const { toast } = useToast();

  const handleGenerateForecast = () => {
    startTransition(async () => {
      const historicalData = transactions
        .map(t => `${t.type} of $${t.amount} from ${t.source} on ${new Date(t.date).toLocaleDateString()}`)
        .join('\n');

      if (!historicalData) {
        toast({
            variant: "destructive",
            title: "Not Enough Data",
            description: "Please add some transactions before generating a forecast.",
        });
        return;
      }
      
      const result = await getFinancialForecast({ historicalData, marketTrends, assumptions });

      if (result.success && result.data) {
        setForecast(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error Generating Forecast',
          description: result.error,
        });
      }
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <BrainCircuit className="text-primary" />
          AI Financial Forecasting
        </CardTitle>
        <CardDescription>Project future outcomes based on current data and market trends.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="market-trends">Market Trends</Label>
          <Textarea
            id="market-trends"
            placeholder="e.g., Inflation is expected to rise by 2%..."
            value={marketTrends}
            onChange={(e) => setMarketTrends(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="assumptions">Assumptions</Label>
          <Textarea
            id="assumptions"
            placeholder="e.g., Plan to hire a new developer in Q3..."
            value={assumptions}
            onChange={(e) => setAssumptions(e.target.value)}
          />
        </div>
        <Button onClick={handleGenerateForecast} disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
          {isPending ? 'Forecasting...' : 'Generate Forecast'}
        </Button>
      </CardContent>
      {forecast && (
        <CardFooter className="flex flex-col items-start space-y-4 border-t pt-4">
            <h3 className="font-semibold text-lg">Forecast Results</h3>
            <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Forecasted Income:</span>
                    <span className="font-medium text-accent">${forecast.forecastedIncome.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Forecasted Expenses:</span>
                    <span className="font-medium text-destructive">${forecast.forecastedExpenses.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">Forecasted Net Savings:</span>
                    <span className="font-medium text-primary">${forecast.netSavings.toLocaleString()}</span>
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-1">Investment Advice:</h4>
                <p className="text-sm text-muted-foreground">{forecast.investmentAdvice}</p>
            </div>
        </CardFooter>
      )}
       {isPending && (
         <CardFooter>
            <div className="w-full flex justify-center items-center py-4">
                 <Loader2 className="h-6 w-6 animate-spin text-primary" />
                 <p className="ml-3 text-muted-foreground">AI is crunching the numbers...</p>
            </div>
         </CardFooter>
      )}
    </Card>
  );
};

export default FinancialForecasting;
