import { Button } from '@/components/ui/button';
import { BadgeInfo, BadgePlus } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  href: string;
  text: string;
}

export default function EmptyState({
  title,
  description,
  href,
  text,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground bg-muted p-8 text-center animate-in fade-in-50">
        <div className="flex size-24 items-center justify-center rounded-full bg-primary/20">
          <BadgeInfo strokeWidth={3} className="size-16 text-primary" />
        </div>
        <h2 className="mt-6 text-xl font-bold tracking-wide md:text-3xl">
          {title}
        </h2>
        <p className="md:text-md mx-auto mb-8 mt-2 max-w-xl text-center text-xs font-bold leading-tight tracking-wider text-muted-foreground">
          {description}
        </p>

        <Button variant="default" size="lg" asChild>
          <Link href={href} className="flex space-x-2">
            <BadgePlus size={25} strokeWidth={2.5} className="text-white" />
            <p className="tracking-wider md:text-lg">{text}</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
