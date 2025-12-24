import { WalletCards } from 'lucide-react';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="bg-card border-b sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <WalletCards className="h-8 w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold text-foreground font-headline">
              FigmaFinance AI
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
