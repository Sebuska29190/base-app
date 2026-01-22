'use client';

import React from 'react';
import type { Metadata } from 'next';
import { WagmiProvider } from 'wagmi/react';
import { config } from '../lib/wagmi';
import './globals.css';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Gm on Base',
    description: 'Say Gm on Base chain with daily streaks',
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: 'https://your-app.com/embed-image', // placeholder
        button: {
          title: 'Say Gm',
          action: {
            type: 'launch_miniapp',
            name: 'Gm on Base',
            url: 'https://your-app.com', // placeholder
          },
        },
      }),
    },
  };
}

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