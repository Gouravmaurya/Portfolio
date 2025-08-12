'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Layout from '@/components/Layout';

// Import sections with dynamic imports for better performance
const Hero = dynamic(() => import('@/components/sections/Hero'), {
  suspense: true,
});

const About = dynamic(() => import('@/components/sections/About'), {
  suspense: true,
});

const Skills = dynamic(() => import('@/components/sections/Skills'), {
  suspense: true,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  suspense: true,
});

const Education = dynamic(() => import('@/components/sections/Education'), {
  suspense: true,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  suspense: true,
});

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </Suspense>
    </Layout>
  );
}
