'use client';

import React from 'react';
import { WagmiProvider } from 'wagmi/react';
import { config } from '../lib/wagmi';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </body>
    </html>
  );
}