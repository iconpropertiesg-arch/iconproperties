import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import CursorAnimation from '@/components/layout/CursorAnimation';

interface GuideLayoutProps {
  children: ReactNode;
}

export default async function GuideLayout({
  children,
}: GuideLayoutProps) {
  // Load English messages directly for the guide page
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

