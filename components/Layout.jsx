'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const lenisRef = useRef();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenisRef.current = lenis;

      // Update ScrollTrigger on scroll
      lenis.on('scroll', ScrollTrigger.update);

      // Cleanup
      return () => {
        lenis.destroy();
      };
    };

    initLenis();
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <Head>
        <title>Gourav Maurya | Full-Stack Developer</title>
        <meta name="description" content="Full-Stack Developer specializing in building modern web applications with React, Next.js, and Node.js" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar isScrolled={isScrolled} />
      <main className="flex-grow bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">{children}</main>
      <Footer />
    </div>
  );
}
