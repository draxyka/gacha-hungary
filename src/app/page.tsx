import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="home">
      <Link href="/wuthering-waves" className="home-item wuwa">
        <video
          src="https://wutheringwaves.kurogames.com/website-preface/video/bg/bg-video.mp4"
          poster="https://wutheringwaves.kurogames.com/website-preface/video/bg/bg-poster.png"
          autoPlay
          muted
          loop
        ></video>
        <h1>
          Wuthering Waves <span>Magyarország</span>
        </h1>
      </Link>
      <Link href="/" className="home-item hsr is-disabled">
        <video
          src="https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/be5f1cc27a611c0e5997a63832d0f8db_9123723503100695540.mp4"
          poster="https://fastcdn.hoyoverse.com/content-v2/hkrpg/101831/be5f1cc27a611c0e5997a63832d0f8db_9123723503100695540.mp4?x-oss-process=video/snapshot,t_1,f_jpg,m_fast"
          autoPlay
          muted
          loop
        ></video>
        <h1>
          Honkai: Star Rail <span>Magyarország</span>
        </h1>
        <h2>Fejlesztés alatt!</h2>
      </Link>
      <Link href="/" className="home-item zzz is-disabled">
        <video
          src="https://fastcdn.hoyoverse.com/mi18n/nap_global/m20241118hy7aovj94w/upload/2824d9b5bbe2a96da831fea5281529fe_7779703647790743076.mp4"
          poster="https://act.hoyoverse.com/zzz/event/e20241218-landing-qeflv5/images/kv.282a4cda..jpg"
          autoPlay
          muted
          loop
        ></video>
        <h1>
          Zenless Zone Zero <span>Magyarország</span>
        </h1>
        <h2>Fejlesztés alatt!</h2>
      </Link>
      <Link href="/" className="home-item genshin is-disabled">
        <video src="https://genshin.hoyoverse.com/_nuxt/videos/bg.3e78e80.mp4" autoPlay muted loop></video>
        <h1>
          Genshin Impact <span>Magyarország</span>
        </h1>
        <h2>Fejlesztés alatt!</h2>
      </Link>
    </div>
  );
}
