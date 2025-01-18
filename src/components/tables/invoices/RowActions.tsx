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
import {
  BadgeCheck,
  Copy,
  Download,
  Ellipsis,
  Mail,
  Pen,
  Trash2,
} from 'lucide-react';
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
import { DeleteInvoiceAction, MarkAsPaidAction } from '@/lib/actions';
import { toast } from 'sonner';
import Image from 'next/image';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue('id');

  function handleSendReminder() {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      {
        loading: 'Sending Reminder Email...',
        success: 'Reminder Email Sent Successfully',
        error: 'Failed to Send Reminder Email',
      },
    );
  }
  function handleCopy() {
    navigator.clipboard
      .writeText(JSON.stringify(row.original))
      .catch(console.error);
    toast.info(`${row.getValue('clientName')}'s Data has been Copied !!`);
  }

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
        <DropdownMenuContent
          className="w-auto font-jura font-bold tracking-normal"
          align="center"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/invoices/${id}`}>
                <Pen strokeWidth={3} size={15} />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopy}>
              <Copy strokeWidth={3} size={15} />
              <span>Copy</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link target="_blank" href={`/api/invoice/${id}`}>
                <Download strokeWidth={3} size={15} />
                <span>Download</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSendReminder}>
              <Mail strokeWidth={3} size={15} />
              <span>Reminder</span>
            </DropdownMenuItem>
            {row.getValue('status') === 'PENDING' && (
              <Dialog>
                <div className="mt-1 rounded-sm bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-500/70">
                  <DialogTrigger className="flex items-center space-x-2">
                    <BadgeCheck strokeWidth={3} size={15} />
                    <span>Mark as Paid</span>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-xl tracking-wide">
                        Mark as Paid?
                      </DialogTitle>
                      <DialogDescription className="text-sm font-medium tracking-wider">
                        Are you sure you want to mark this invoice as paid?
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center">
                      <Image
                        alt="MarkasPaid"
                        src="/markasPaid.gif"
                        width={500}
                        height={500}
                        className="rounded-xl"
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild className="mr-auto">
                        <Button
                          type="button"
                          variant="secondary"
                          className="font-jura"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Form action={MarkAsPaidAction}>
                        <Input type="hidden" name="id" value={`${id}`} />
                        <SubmitButton
                          variant="ghost"
                          text="Mark as Paid"
                          loadingText="Marking as Paid..."
                          className="bg-emerald-500 text-white hover:bg-emerald-500"
                        />
                      </Form>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>
            )}
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
                  <DialogDescription className="text-sm font-medium tracking-wider">
                    This action will permanently delete your account and remove
                    your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                  <Image
                    alt="MarkasPaid"
                    src="/warning.gif"
                    width={400}
                    height={400}
                    className="rounded-xl"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild className="mr-auto">
                    <Button
                      type="button"
                      variant="secondary"
                      className="font-jura"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Form action={DeleteInvoiceAction}>
                    <Input type="hidden" name="id" value={`${id}`} />
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
