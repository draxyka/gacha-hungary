export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/10 bg-black/40">
      <div className="wrapper text-center">
        <p className="text-white/30 text-sm tracking-wider">
          &copy; {new Date().getFullYear()} Gacha Hungary. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
