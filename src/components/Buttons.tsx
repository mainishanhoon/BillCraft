"use client"

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

interface ButtonProps {
  text: string;
  loadingText: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
}

export function SubmitButton({ text,loadingText, variant, className }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn('w-fit border-dashed border-2 border-muted-foreground', className)}>
          <Loader className="mr-2 size-5 font-jura animate-spin font-bold [animation-duration:3s]" />
          {loadingText}
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn('w-fit tracking-wider font-jura font-bold', className)}
        >
          {text}
        </Button>
      )}
    </>
  );
