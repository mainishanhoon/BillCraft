import { prisma } from '@/lib/prisma';
import { fetchUser } from '@/hooks/hooks';
import { EmailClient, Sender } from '@/lib/mailtrap';
import { NextResponse } from 'next/server';

interface Params {
  params: Promise<{ invoiceId: string }>;
}

export async function POST(req: Request, { params }: Params) {
  try {
    const session = await fetchUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    EmailClient.send({
      from: Sender,
      to: [{ email: 'nishankashyap@hotmail.com' }],
      template_uuid: 'fb3c88a4-3d81-4051-bb8b-9915177aaf6c',
      template_variables: {
        first_name: invoiceData.clientName!,
        company_info_name: 'BillCraft',
        company_info_address:
          'E-38/39, Rajiv Chowk, Inner Circle, Block E, Connaught Place, New Delhi',
        company_info_city: 'Bhopal',
        company_info_zip_code: '110001',
        company_info_country: 'India',
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send Email reminder' },
      { status: 500 },
    );
  }
}
