'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { parseWithZod } from '@conform-to/zod';
import { InvoiceSchema, OnboardingUserSchema } from '@/lib/zod';
import { formatCurrency } from '@/utils/formatCurrency';

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

  // const sender = {
  //   email: 'hello@demomailtrap.com',
  //   name: 'Jan Marshal',
  // };

  // emailClient.send({
  //   from: sender,
  //   to: [{ email: 'jan@alenix.de' }],
  //   template_uuid: '3c01e4ee-a9ed-4cb6-bbf7-e57c2ced6c94',
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDueDate: new Intl.DateTimeFormat('en-US', {
  //       dateStyle: 'long',
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: formatCurrency({
  //       amount: submission.value.total,
  //       currency: submission.value.currency as any,
  //     }),
  //     invoiceLink:
  //       process.env.NODE_ENV !== 'production'
  //         ? `http://localhost:3000/api/invoice/${data.id}`
  //         : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
  //   },
  // });

  return redirect('/dashboard/invoices');
}
