import { ChannelType, SocialMediaData } from '../page';
import './Social-media-wrapper.css';
import Twitch from './Twitch';
import Youtube from './Youtube';

export default function SocialMediaWrapper({ socialMediaData }: { socialMediaData: SocialMediaData[] }) {
  return (
    <section className="social-media">
      <div className="wrapper">
        <h1>Social Media</h1>
        <h2>Twitch</h2>
        <ul>
          {socialMediaData?.map(
            (channel, index) =>
              channel.type === ChannelType.Twitch && (
                <li key={index}>
                  <Twitch channel={channel.channelId} />
                </li>
              ),
          )}
        </ul>
        <h2>YouTube</h2>
        <ul>
          {socialMediaData?.map(
            (channel, index) =>
              channel.type === ChannelType.Youtube && (
                <li key={index}>
                  <Youtube channelId={channel.channelId} />
                </li>
              ),
          )}
        </ul>
      </div>
    </section>
  );
}
