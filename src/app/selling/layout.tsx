import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import CursorAnimation from '@/components/layout/CursorAnimation';

interface SellingLayoutProps {
  children: ReactNode;
}

export default async function SellingLayout({
  children,
}: SellingLayoutProps) {
  // Load English messages directly for the selling page
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










