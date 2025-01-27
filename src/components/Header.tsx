import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <Link href="/wuthering-waves" />
          Wuthering Waves
        </li>
        <li>
          <Link href="/" />
          Honkai: Star Rail
        </li>
        <li>
          <Link href="/" />
          Zenless Zone Zero
        </li>
        <li>
          <Link href="/" />
          Genshin Impact
        </li>
      </ul>
    </header>
  );
}
