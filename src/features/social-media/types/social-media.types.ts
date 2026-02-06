export enum ChannelType {
  Twitch = 'Twitch',
  Youtube = 'Youtube',
}

export interface SocialMediaChannel {
  id: string;
  channelId: string;
  name: string;
  type: ChannelType;
}
