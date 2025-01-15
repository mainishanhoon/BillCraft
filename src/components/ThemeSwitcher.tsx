'use client';

import * as React from 'react';
import { Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="bg-muted border-muted-foreground/40 dark:border-muted-foreground/50 group relative size-9 overflow-hidden rounded-xl md:rounded-2xl border md:size-10 md:border-2"
    >
      {/* Light mode: Sun icon, replaced by Sunset on hover */}
      <Sun
        className="absolute inset-0 m-auto transition-all duration-300 group-hover:scale-0 group-hover:opacity-0 dark:scale-0 dark:opacity-0"
        color="hsl(var(--foreground))"
        size={35}
        strokeWidth={2.5}
      />
      <Sunset
        className="bg-muted absolute inset-0 m-auto scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 dark:hidden"
        color="hsl(var(--foreground))"
        size={30}
        strokeWidth={2.5}
      />

      {/* Dark mode: Moon icon, replaced by Sunrise on hover */}
      <Moon
        className="absolute inset-0 m-auto scale-0 opacity-0 transition-all duration-300 dark:scale-100 dark:opacity-100 dark:group-hover:scale-0 dark:group-hover:opacity-0"
        color="hsl(var(--foreground))"
        size={30}
        strokeWidth={2.5}
      />
      <Sunrise
        className="bg-muted absolute inset-0 m-auto scale-0 opacity-0 transition-all duration-300 dark:group-hover:scale-100 dark:group-hover:opacity-100"
        color="hsl(var(--foreground))"
        size={30}
        strokeWidth={2.5}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
