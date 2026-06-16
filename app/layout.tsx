import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MeetingMind | Meeting intelligence',
  description: 'prepare, capture, and follow up on meetings with memory that compounds',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
