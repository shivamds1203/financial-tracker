export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  source: string; // or category for expenses
  amount: number;
  date: string;
};

export type Forecast = {
  forecastedIncome: number;
  forecastedExpenses: number;
  netSavings: number;
  investmentAdvice: string;
};

export type Insights = {
  summary: string;
  insights: string[];
  recommendations: string[];
};
