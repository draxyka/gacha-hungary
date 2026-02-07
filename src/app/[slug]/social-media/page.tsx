import SocialMedia from '@/features/social-media/SocialMedia';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Magyar gacha játék közösségi média — Twitch streamerek és YouTube csatornák.',
};

export default function SocialMediaPage() {
  return <SocialMedia />;
}
