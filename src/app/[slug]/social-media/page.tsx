import { get } from '@/utils/req.service';

import SocialMediaWrapper from './components/Social-media-wrapper';

export interface SocialMediaData {
  id: string;
  channelId: string;
  type: ChannelType;
}

export enum ChannelType {
  Twitch = 'Twitch',
  Youtube = 'Youtube',
}

export default async function SocialMedia({ params }: { params: { slug: string } }) {
  const currentSlug = await params;
  const data = await get(`${currentSlug.slug}/channels`);

  return <SocialMediaWrapper socialMediaData={data} />;
}
