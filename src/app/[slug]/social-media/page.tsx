import SocialMedia from '@/features/social-media/SocialMedia';

export default async function SocialMediaPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <SocialMedia slug={slug} />;
}
