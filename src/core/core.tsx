import Link from 'next/link';

import './core.css';

export default function Core({ data }: { data: { title: string; type: 'wuwa' | 'genshin' | 'zzz' | 'hsr' } }) {
  return (
    <>
      <section className={`core ${data.type}`}>
        <div className="wrapper">
          <div className="core-wrapper">
            <div className="core-main">
              <h1>{data.title}</h1>
              <Link className="card news" href="wuthering-waves/hirek">
                Hirek
              </Link>
            </div>
            <div className="core-sub">
              <Link className="card" href="wuthering-waves/karakterek">
                <span>Karakterek</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
