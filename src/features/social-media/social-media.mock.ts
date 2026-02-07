import { ChannelType, SocialMediaChannel } from './types/social-media.types';

// TODO: Social media csatornák korábban BE-ből jöttek ({slug}/channels endpoint)
export const CHANNELS_DATA: Record<string, SocialMediaChannel[]> = {
  'wuthering-waves': [
    { id: '1', channelId: 'drax18', name: 'Drax18', type: ChannelType.Twitch },
    { id: '2', channelId: 'seshihira', name: 'Seshihira', type: ChannelType.Twitch },
    { id: '3', channelId: 'bjNTSBYoVgFEy_UY8LL4pA', name: 'Drax18', type: ChannelType.Youtube },
    { id: '4', channelId: 'UC1M9U7vBaLZHqwqltmxDIbg', name: 'Seshihira', type: ChannelType.Youtube },
  ],
  // TODO: Többi játék csatornái
};
