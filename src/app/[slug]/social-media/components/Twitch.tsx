'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './Twitch.css';

const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TWITCH_ACESS_TOKEN!;

type Twitch = {
  broadcaster_type: string;
  created_at: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: number;
};

type TwitchLive = {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string[];
  tags: string[];
  is_mature: boolean;
};

const Twitch = ({ channel }: { channel: string }) => {
  const [liveData, setLiveData] = useState<TwitchLive | null>(null);
  const [channelData, setChannelData] = useState<Twitch | null>(null);

  useEffect(() => {
    const checkStreamStatus = async () => {
      try {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
          headers: {
            'Client-ID': CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        const data = await response.json();
        setLiveData(data.data[0]);
      } catch (error) {
        console.error('Hiba a Twitch API lekérdezésnél:', error);
      }
    };

    const fetchChannelData = async () => {
      try {
        const response = await fetch(`https://api.twitch.tv/helix/users?login=${channel}`, {
          headers: {
            'Client-ID': CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        const data = await response.json();
        setChannelData(data.data[0]);
      } catch (error) {
        console.error('Hiba a csatorna adatainál:', error);
      }
    };

    checkStreamStatus();
    fetchChannelData();
  }, [channel]);

  const liveThumbnailUrl = liveData
    ? liveData.thumbnail_url.replace('{width}', '1920').replace('{height}', '1080')
    : '';

  return (
    <div className="twitch">
      {channelData ? (
        <a
          className={liveData ? 'is-live' : 'is-offline'}
          href={`https://twitch.tv/${channel}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={liveData ? liveThumbnailUrl : channelData?.profile_image_url || '/assets/images/fallback-image.png'}
            alt={`${channel} profilkép`}
            fill={true}
            sizes="(max-width: 768px) 100vw, 300px"
            priority={true}
          />
          <div className="twitch-header">
            <h3>{channelData?.login}</h3>
            <span>{liveData ? `Élő` : 'Offline'}</span>
          </div>
        </a>
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  );
};

export default Twitch;
