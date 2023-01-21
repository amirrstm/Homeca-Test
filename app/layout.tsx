'use client';

import '@/styles/globals.css';

import Header from './Header';
import RootStyleRegistry from './RootStyleRegistery';
import RootQueryRegistery from './RootQueryRegistery';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Search Country App</title>
      </head>
      <body className="overflow-y-scroll font-Yekan" dir="rtl">
        <RootStyleRegistry>
          <RootQueryRegistery>
            <div>
              <Header />

              <div className="mx-auto max-w-[1440px] p-4">
                <div className="rounded-xl border p-4">{children}</div>
              </div>
            </div>
          </RootQueryRegistery>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
