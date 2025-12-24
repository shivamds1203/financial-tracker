'use server';

/**
 * @fileOverview Generates insights and summaries of financial data for a summary dashboard.
 *
 * - generateSummaryDashboardInsights - A function that generates insights and summaries of financial data.
 * - GenerateSummaryDashboardInsightsInput - The input type for the generateSummaryDashboardInsights function.
 * - GenerateSummaryDashboardInsightsOutput - The return type for the generateSummaryDashboardInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSummaryDashboardInsightsInputSchema = z.object({
  income: z
    .array(z.object({source: z.string(), amount: z.number()}))
    .describe('An array of income sources and amounts.'),
  expenditures: z
    .array(z.object({category: z.string(), amount: z.number()}))
    .describe('An array of expenditures categorized by type and amount.'),
  budget: z.number().describe('The total budget for the period.'),
});
export type GenerateSummaryDashboardInsightsInput = z.infer<
  typeof GenerateSummaryDashboardInsightsInputSchema
>;

const GenerateSummaryDashboardInsightsOutputSchema = z.object({
  summary: z.string().describe('A summary of the financial data.'),
  insights: z.array(z.string()).describe('Key insights from the data.'),
  recommendations: z.array(z.string()).describe('Recommendations for improvement.'),
});
export type GenerateSummaryDashboardInsightsOutput = z.infer<
  typeof GenerateSummaryDashboardInsightsOutputSchema
>;

export async function generateSummaryDashboardInsights(
  input: GenerateSummaryDashboardInsightsInput
): Promise<GenerateSummaryDashboardInsightsOutput> {
  return generateSummaryDashboardInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummaryDashboardInsightsPrompt',
  input: {schema: GenerateSummaryDashboardInsightsInputSchema},
  output: {schema: GenerateSummaryDashboardInsightsOutputSchema},
  prompt: `You are a financial advisor providing insights and summaries of financial data for a user dashboard.

  Summarize the key financial metrics, identify areas for improvement, and provide recommendations based on the following data:

  Income:{{#each income}}{{{source}}}: {{{amount}}}{{#unless @last}}, {{/unless}}{{/each}}
  Expenditures: {{#each expenditures}}{{{category}}}: {{{amount}}}{{#unless @last}}, {{/unless}}{{/each}}
  Budget: {{{budget}}}

  Write a concise summary, list key insights, and provide actionable recommendations.
  Ensure the tone is professional, encouraging, and focused on helping the user improve their financial health.
  Follow the schema descriptions closely.
  `,
});

const generateSummaryDashboardInsightsFlow = ai.defineFlow(
  {
    name: 'generateSummaryDashboardInsightsFlow',
    inputSchema: GenerateSummaryDashboardInsightsInputSchema,
    outputSchema: GenerateSummaryDashboardInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
