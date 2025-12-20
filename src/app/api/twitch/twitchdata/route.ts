import { NextRequest, NextResponse } from 'next/server';

const TWITCH_CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!;
const TWITCH_CLIENT_SECRET = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET!;

const streamerData = async (channel: string) => {
  const response = await fetch(`https://api.twitch.tv/helix/streams?login=${channel}`, {
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      Authorization: `Bearer ${TWITCH_CLIENT_SECRET}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twitch API hiba: ${response.statusText}, válasz: ${errorText}`);
  }

  const data = await response.json();
  return data.data[0];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get('channel')?.toLowerCase();

  if (!channel) {
    return NextResponse.json({ error: 'Channel parameter is required' }, { status: 400 });
  }

  try {
    const data = await streamerData(channel);
    console.log(data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch stream status' }, { status: 500 });
  }
}
