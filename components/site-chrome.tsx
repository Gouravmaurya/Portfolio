"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteChrome() {
  const pathname = usePathname();
  const home = pathname === "/";
  return <header className="editorial-header">
    <Link href="/" className="wordmark" aria-label="Gourav Maurya home">GM<span>®</span></Link>
    <p className="header-location">INDIA<br />26.8467° N</p>
    <nav aria-label="Primary navigation">
      <Link href={home ? "#work" : "/#work"}>WORK</Link>
      <Link href={home ? "#about" : "/#about"}>ABOUT</Link>
      <Link href={home ? "#contact" : "/#contact"}>CONTACT</Link>
    </nav>
    <a className="header-email" href="mailto:gouravmaurya351@gmail.com"><i /> AVAILABLE<br />FOR SELECTED WORK</a>
  </header>;
}
