import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'de', 'es'] as const;

export default getRequestConfig(async ({requestLocale}) => {
  // Wait for the locale to be resolved
  let locale = await requestLocale;
  
  // Default to 'en' if no locale is provided (for routes outside [locale])
  if (!locale) {
    locale = 'en';
  }
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
