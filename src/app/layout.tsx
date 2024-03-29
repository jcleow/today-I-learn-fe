import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { ToastProvider } from '@/context/ToastContext'
import { ArticleProvider } from '@/context/ArticleContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Today I learnt',
  description: 'Generated by yours truly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ToastProvider>
            <ArticleProvider>
              {children}
            </ArticleProvider>
          </ToastProvider>
      </body>
    </html>
  )
}
