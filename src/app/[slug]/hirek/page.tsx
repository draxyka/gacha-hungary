import { redirect } from 'next/navigation';

/** A hírlista a játék főoldalára költözött — a régi linkek ide irányítanak át. */
export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/${slug}`);
}
