'use client';

import { ReactElement } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { useStyledComponentsRegistry } from '@/lib/styling';

export default function RootStyleRegistry({
  children,
}: {
  children: ReactElement;
}) {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] =
    useStyledComponentsRegistry();

  useServerInsertedHTML(() => {
    return <>{styledComponentsFlushEffect()}</>;
  });

  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
}
