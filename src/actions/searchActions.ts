'use server';

import { redirect } from 'next/navigation';

export async function searchAction(
  locale: string,
  _prevState: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const search = (formData.get('search') as string).trim();
  redirect(`/${locale}?page=1&search=${search}`);
}
