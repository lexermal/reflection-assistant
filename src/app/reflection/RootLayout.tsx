'use client'

import { ReactNode } from 'react';
import React from 'react';
import { Env } from '@/utils/env';
import { EnvProvider } from '@/providers/EnvProvider';

type Props = {
  env: Env;
  children: ReactNode;
};

export default function RootLayout({ children, env }: Props) {
  return (
    <EnvProvider env={env}>
      {children}
    </EnvProvider>
  );
}