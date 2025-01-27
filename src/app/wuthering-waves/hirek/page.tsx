import Link from 'next/link';
import './hirek.css';

export default function WutheringWavesNews() {
  return (
    <section className="news">
      <div className="wrapper">
        <h1>Hirek</h1>
        <div className="news-card-wrapper">
          <article>
            <img src="https://pbs.twimg.com/media/GiGu4_fa0AA9VT9.jpg" alt="" />
            <h2>Teszt cim</h2>
            <Link href="/">Bővebben</Link>
          </article>
          <article>
            <img src="https://pbs.twimg.com/media/GiGu4_fa0AA9VT9.jpg" alt="" />
            <h2>Teszt cim</h2>
            <Link href="/">Bővebben</Link>
          </article>
          <article>
            <img src="https://pbs.twimg.com/media/GiGu4_fa0AA9VT9.jpg" alt="" />
            <h2>Teszt cim</h2>
            <Link href="/">Bővebben</Link>
          </article>
        </div>
      </div>
    </section>
  );
}
