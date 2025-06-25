
import React from 'react';
import { BRAND_CONFIG } from '../../constants';
import { SocialMediaLink } from '../../types';

// Simple SVG Icons (replace with more elaborate ones if needed)
const BlogIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25h-13.5A2.25 2.25 0 0 1 3 18V6.375c0-.621.504-1.125 1.125-1.125H7.5M12 3v3.75m0 0h-3.75M12 6.75A2.25 2.25 0 0 1 14.25 9H12V6.75Z" /></svg>;
const LinkedInIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z"/></svg>;
const InstagramIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>;
const GithubIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const XIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YouTubeIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.707v-8.16l7.015 4.08-7.015 4.08z"/></svg>;


const Footer: React.FC = () => {
  const socialLinks: SocialMediaLink[] = [
    { name: 'blog', url: BRAND_CONFIG.brand.socialMedia.blog, icon: <BlogIcon /> },
    { name: 'linkedin', url: BRAND_CONFIG.brand.socialMedia.linkedin, icon: <LinkedInIcon /> },
    { name: 'instagram', url: BRAND_CONFIG.brand.socialMedia.instagram, icon: <InstagramIcon /> },
    { name: 'github', url: BRAND_CONFIG.brand.socialMedia.github, icon: <GithubIcon /> },
    { name: 'x', url: BRAND_CONFIG.brand.socialMedia.x, icon: <XIcon /> },
    { name: 'youtube', url: BRAND_CONFIG.brand.socialMedia.youtube, icon: <YouTubeIcon /> },
  ];

  return (
    <footer className="bg-secondary text-neutral-light py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm italic mb-4">"{BRAND_CONFIG.brand.slogan}"</p>
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map(link => (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={link.name}
              className="text-primary hover:text-yellow-300 transition-colors duration-200"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} {BRAND_CONFIG.brand.organizationLongName}. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Developed by Arlin Robeiksha Britto [ AI Products Engineering Team]
        </p>
        <p className="text-xs mt-1">
          Contact: <a href={`mailto:${BRAND_CONFIG.brand.email}`} className="hover:underline">{BRAND_CONFIG.brand.email}</a> | 
          Phone: {BRAND_CONFIG.brand.mobile}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
