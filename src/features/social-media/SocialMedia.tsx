'use client';

import { CHANNELS_DATA } from './social-media.mock';
import { ChannelType } from './types/social-media.types';
import Twitch from './components/Twitch';
import Youtube from './components/Youtube';
import { useGame } from '@/context/GameContext';

export default function SocialMedia() {
  const game = useGame();
  const slug = game?.slug ?? '';
  const channels = CHANNELS_DATA[slug] ?? [];
  const twitchChannels = channels.filter((ch) => ch.type === ChannelType.Twitch);
  const youtubeChannels = channels.filter((ch) => ch.type === ChannelType.Youtube);

  return (
    <section className="flex-1 py-16 text-white">
      <div className="wrapper">
        <h1 className="text-3xl md:text-4xl uppercase font-extralight mb-12 tracking-[0.25em] text-center">
          Social Media
        </h1>

        {twitchChannels.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl uppercase tracking-[0.2em] font-light mb-8 text-purple-400 border-b border-purple-400/20 pb-3">
              Twitch
            </h2>
            <ul
              className="grid list-none gap-6"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(350px, 100%), 1fr))' }}
            >
              {twitchChannels.map((channel) => (
                <li key={channel.id}>
                  <Twitch channel={channel.channelId} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {youtubeChannels.length > 0 && (
          <div>
            <h2 className="text-xl uppercase tracking-[0.2em] font-light mb-8 text-red-400 border-b border-red-400/20 pb-3">
              YouTube
            </h2>
            <ul
              className="grid list-none gap-6"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(275px, 100%), 1fr))' }}
            >
              {youtubeChannels.map((channel) => (
                <li key={channel.id}>
                  <Youtube channelId={channel.channelId} name={channel.name} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
