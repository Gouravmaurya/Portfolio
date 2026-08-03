"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteChrome() {
  const pathname = usePathname();
  const home = pathname === "/";
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Gourav Maurya home">G/M<span>26</span></Link>
      <p className="header-coordinate">INDIA<br />26.8467° N</p>
      <nav aria-label="Primary navigation">
        <Link href={home ? "#work" : "/#work"}>WORK</Link>
        <Link href={home ? "#practice" : "/#practice"}>PRACTICE</Link>
        <Link href={home ? "#about" : "/#about"}>ABOUT</Link>
      </nav>
      <a className="header-status" href="mailto:gouravmaurya351@gmail.com"><i /> OPEN CHANNEL</a>
    </header>
  );
}
