'use client';

import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Copy, Ellipsis, Pen, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Form from 'next/form';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/Buttons';
import { DeleteInvoiceAction } from '@/lib/actions';
import { toast } from 'sonner';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue('id');
  const handleCopy = () => {
    navigator.clipboard
      .writeText(JSON.stringify(row.original))
      .catch(console.error);
    toast.info(`${row.getValue('name')}'s Data has been Copied !!`);
  };

  return (
    <div className="flex justify-center" suppressHydrationWarning={true}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex size-8 bg-muted p-0 hover:bg-muted-foreground/20 data-[state=open]:bg-muted-foreground/20"
          >
            <Ellipsis strokeWidth={3} size={20} />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20" align="center">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/products/${id}`}>
                <Pen strokeWidth={3} size={15} />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy}>
              <Copy strokeWidth={3} size={15} />
              <span>Copy</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Dialog>
            <div className="rounded-sm bg-destructive px-3 py-1 text-white hover:bg-destructive/70">
              <DialogTrigger className="flex items-center space-x-2">
                <Trash2 strokeWidth={3} size={15} />
                <span>Delete</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl tracking-wide">
                    Are you absolutely sure?
                  </DialogTitle>
                  <DialogDescription className="text-sm font-bold tracking-wider">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild className="mr-auto">
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Form action={DeleteInvoiceAction}>
                    <Input
                      type="hidden"
                      name="productId"
                      value={row.getValue('id')}
                    />
                    <SubmitButton
                      variant="destructive"
                      text="Delete Invoice"
                      loadingText="Deleting Invoice..."
                    />
                  </Form>
                </DialogFooter>
              </DialogContent>
            </div>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
