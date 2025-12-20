import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get('channelId');
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!channelId) {
    return NextResponse.json({ error: 'Missing channelId parameter' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`,
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
    }

    const channel = data.items[0].snippet;

    return NextResponse.json({
      title: channel.title,
      logo: channel.thumbnails.default.url,
      link: `https://www.youtube.com/channel/${channelId}`,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch YouTube data' }, { status: 500 });
  }
}
