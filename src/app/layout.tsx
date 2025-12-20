import '../styles/globals.css';
import SWRegister from './sw-register';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <main>{children}</main>
        <SWRegister />
      </body>
    </html>
  );
}
