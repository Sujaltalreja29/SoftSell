"use client";
import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

// This is a Client Component wrapper that provides theme context
export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}