"use server"

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { fetchUser } from "@/hooks/hooks";
import { parseWithZod } from "@conform-to/zod";
import { OnboardingUserSchema } from "@/lib/zod";

export async function OnboardingUserAction(currentState: unknown, formData: FormData) {
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
