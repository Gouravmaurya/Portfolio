"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useExperience } from "./experience-provider";

export function SiteChrome() {
  const pathname = usePathname();
  const home = pathname === "/";
  const { depthEnabled, soundEnabled, toggleDepth, toggleSound } = useExperience();
  const anchor = (hash: string) => home ? hash : `/${hash}`;

  return <header className="atlas-header" data-page-shell>
    <Link href="/" className="atlas-wordmark" aria-label="Gourav Maurya home">
      GM <span>28.61° N / 77.20° E</span>
    </Link>
    <nav aria-label="Primary navigation">
      <a href={anchor("#territory")}>Work</a>
      <a href={anchor("#instruments")}>Practice</a>
      <a href={anchor("#field-notes")}>About</a>
      <a href={anchor("#open-route")}>Contact</a>
    </nav>
    <div className="experience-controls">
      <button className="depth-toggle" type="button" onClick={toggleDepth} aria-pressed={depthEnabled} aria-label={`${depthEnabled ? "Disable" : "Enable"} visual depth`}>
        <span aria-hidden="true">{depthEnabled ? "Depth on" : "Depth off"}</span><i aria-hidden="true"><b /><b /></i>
      </button>
      <button className="sound-toggle" type="button" onClick={toggleSound} aria-pressed={soundEnabled} aria-label={`${soundEnabled ? "Disable" : "Enable"} ambient sound`}>
        <span aria-hidden="true">{soundEnabled ? "Sound on" : "Sound off"}</span><i aria-hidden="true" />
      </button>
    </div>
  </header>;
}
