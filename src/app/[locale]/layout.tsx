import type { ReactNode, JSX } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Layout from '../../components/Layout/Layout';
import ThemeProvider from '../../context/ThemeProvider';
import StoreProvider from '../../store/StoreProvider';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <StoreProvider>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </StoreProvider>
    </NextIntlClientProvider>
  );
}
