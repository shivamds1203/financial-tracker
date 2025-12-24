'use server';

import { forecastFinancialOutcome, FinancialForecastingInput } from '@/ai/flows/ai-powered-financial-forecasting';
import { generateSummaryDashboardInsights, GenerateSummaryDashboardInsightsInput } from '@/ai/flows/generate-summary-dashboard-insights';

export async function getFinancialForecast(input: FinancialForecastingInput) {
  try {
    const forecast = await forecastFinancialOutcome(input);
    return { success: true, data: forecast };
  } catch (error) {
    console.error('Error in getFinancialForecast:', error);
    return { success: false, error: 'Failed to generate financial forecast. Please try again.' };
  }
}

export async function getDashboardInsights(input: GenerateSummaryDashboardInsightsInput) {
  try {
    const insights = await generateSummaryDashboardInsights(input);
    return { success: true, data: insights };
  } catch (error) {
    console.error('Error in getDashboardInsights:', error);
    return { success: false, error: 'Failed to generate dashboard insights. Please try again.' };
  }
}
