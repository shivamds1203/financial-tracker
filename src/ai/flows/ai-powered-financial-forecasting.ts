'use server';
/**
 * @fileOverview AI-powered financial forecasting flow.
 *
 * - forecastFinancialOutcome - A function that forecasts financial outcomes based on historical data and trends.
 * - FinancialForecastingInput - The input type for the forecastFinancialOutcome function.
 * - FinancialForecastingOutput - The return type for the forecastFinancialOutcome function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FinancialForecastingInputSchema = z.object({
  historicalData: z.string().describe('Historical financial data, including income and expenses.'),
  marketTrends: z.string().describe('Current market trends and economic indicators.'),
  assumptions: z.string().optional().describe('Assumptions about future income or expenses.'),
});
export type FinancialForecastingInput = z.infer<typeof FinancialForecastingInputSchema>;

const FinancialForecastingOutputSchema = z.object({
  forecastedIncome: z.number().describe('Forecasted total income.'),
  forecastedExpenses: z.number().describe('Forecasted total expenses.'),
  netSavings: z.number().describe('The net savings, based on forecasted income and expenses.'),
  investmentAdvice: z.string().describe('Investment advice based on the forecast.'),
});
export type FinancialForecastingOutput = z.infer<typeof FinancialForecastingOutputSchema>;

export async function forecastFinancialOutcome(input: FinancialForecastingInput): Promise<FinancialForecastingOutput> {
  return forecastFinancialOutcomeFlow(input);
}

const forecastFinancialOutcomePrompt = ai.definePrompt({
  name: 'forecastFinancialOutcomePrompt',
  input: {schema: FinancialForecastingInputSchema},
  output: {schema: FinancialForecastingOutputSchema},
  prompt: `You are a financial advisor. Based on the user's historical financial data, current market trends, and any assumptions they provide, forecast their financial outcome and provide investment advice.

Historical Data: {{{historicalData}}}
Market Trends: {{{marketTrends}}}
Assumptions: {{{assumptions}}}

Forecasted Income: 
Forecasted Expenses: 
Net Savings: 
Investment Advice:`,
});

const forecastFinancialOutcomeFlow = ai.defineFlow(
  {
    name: 'forecastFinancialOutcomeFlow',
    inputSchema: FinancialForecastingInputSchema,
    outputSchema: FinancialForecastingOutputSchema,
  },
  async input => {
    const {output} = await forecastFinancialOutcomePrompt(input);
    return output!;
  }
);
