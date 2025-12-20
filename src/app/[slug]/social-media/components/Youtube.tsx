'use client';

import './Youtube.css';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Youtube = ({ channelId }: { channelId: string }) => {
  const [channelData, setChannelData] = useState<{ title: string; logo: string; link: string }>();

  useEffect(() => {
    const fetchChannelData = async (channelId: string) => {
      const response = await fetch(`/api/youtube?channelId=${channelId}`);
      const data = await response.json();
      setChannelData(data);
    };

    fetchChannelData(channelId);
  }, [channelId]);

  return (
    <>
      {channelData ? (
        <div className="youtube">
          <Image src={channelData.logo} alt={channelData.title} width={100} height={100} className="card-image" />
          <h3 className="card-title">{channelData.title}</h3>
          <a href={channelData.link} target="_blank" className="card-button">
            Csatorna megnyitása
          </a>
        </div>
      ) : (
        <p>Betöltés...</p>
      )}
    </>
  );
};

export default Youtube;
