import Header from '@/components/figma-finance/Header';
import SummaryDashboard from '@/components/figma-finance/SummaryDashboard';
import TransactionManager from '@/components/figma-finance/TransactionManager';

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SummaryDashboard />
            </div>
            <div className="lg:col-span-1">
              <TransactionManager />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
