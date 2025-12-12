import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import CursorAnimation from '@/components/layout/CursorAnimation';

interface BuyingLayoutProps {
  children: ReactNode;
}

export default async function BuyingLayout({
  children,
}: BuyingLayoutProps) {
  // Load English messages directly for the buying page
  const messages = (await import('../../../messages/en.json')).default;

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <div className="min-h-screen flex flex-col">
        <CursorAnimation />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}

