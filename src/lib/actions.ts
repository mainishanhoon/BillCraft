'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { parseWithZod } from '@conform-to/zod';
import { InvoiceSchema, OnboardingUserSchema } from '@/lib/zod';
import { formatCurrency } from '@/utils/formatCurrency';
import { EmailClient, Sender } from '@/lib/mailtrap';

const PUBLIC_URL = process.env.PUBLIC_URL!;

export async function OnboardingUserAction(
  currentState: unknown,
  formData: FormData,
) {
  const session = await fetchUser();

  const submission = parseWithZod(formData, { schema: OnboardingUserSchema });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      state: submission.value.state,
      city: submission.value.city,
      street: submission.value.street,
      pincode: submission.value.pincode,
    },
  });

  redirect('/dashboard');
}

export async function CreateInvoiceAction(
  currentState: unknown,
  formData: FormData,
) {
  const session = await fetchUser();

  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromName: submission.value.fromName,
      fromEmail: submission.value.fromEmail,
      fromStreet: submission.value.fromStreet,
      fromCity: submission.value.fromCity,
      fromState: submission.value.fromState,
      fromPinCode: submission.value.fromPinCode,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

  EmailClient.send({
    from: Sender,
    to: [{ email: 'nishankashyap@hotmail.com' }],
    template_uuid: 'b6152898-03a9-40da-b02f-3bacdb381c74',
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceDueDate: new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'long',
      }).format(new Date(submission.value.date)),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `${PUBLIC_URL}/api/invoice/${data.id}`,
    },
  });

  return redirect('/dashboard/invoices');
}

export async function InvoiceUpdationAction(
  prevState: unknown,
  formData: FormData,
) {
  const session = await fetchUser();

  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get('id') as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromStreet: submission.value.fromStreet,
      fromCity: submission.value.fromCity,
      fromState: submission.value.fromState,
      fromPinCode: submission.value.fromPinCode,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });

  EmailClient.send({
    from: Sender,
    to: [{ email: 'nishankashyap@hotmail.com' }],
    template_uuid: 'a4d93d1e-ab92-4852-8507-82cf2febf4ea',
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceDueDate: new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
      }).format(new Date(submission.value.date)),
      invoiceAmount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `${PUBLIC_URL}/api/invoice/${data.id}`,
    },
  });

  return redirect('/dashboard/invoices');
}

export async function DeleteInvoiceAction(formData: FormData) {
  const session = await fetchUser();

  await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: formData.get('id') as string,
    },
  });

  return redirect('/dashboard/invoices');
}

export async function MarkAsPaidAction(formData: FormData) {
  const session = await fetchUser();

  await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: formData.get('id') as string,
    },
    data: {
      status: 'PAID',
    },
  });

  return redirect('/dashboard/invoices');
}
