'use client';

import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Gouravmaurya',
      icon: <FaGithub className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/gourav-maurya-a39969226/',
      icon: <FaLinkedin className="w-5 h-5" />
    },
    {
      name: 'Email',
      url: 'mailto:gouravmaurya351@gmail.com',
      icon: <FaEnvelope className="w-5 h-5" />
    }
  ];

  return (
    <footer className="relative z-10 bg-black text-gray-400 py-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-6 mb-4 md:mb-0">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-xs">
            © {currentYear} Gourav Maurya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}