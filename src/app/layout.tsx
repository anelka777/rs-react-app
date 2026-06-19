import type { ReactNode, JSX } from 'react';
import '../index.css';

export const metadata = {
  title: 'rs-react-app',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
