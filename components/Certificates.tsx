"use client";

import dynamic from 'next/dynamic';

const DomeGallery = dynamic(() => import('./DomeGallery'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs uppercase tracking-widest">Loading Gallery Module...</div>
});

const certificates = [
  {
    src: '/certificates/python-intermediate.webp',
    link: 'https://www.sololearn.com/certificates/CC-VEXTCHGO',
    title: 'Python Intermediate',
    description: 'Sololearn • Apr 2025'
  },
  {
    src: '/certificates/python-intro.webp',
    link: 'https://www.sololearn.com/certificates/CC-HBT71LPZ',
    title: 'Introduction to Python',
    description: 'Sololearn • Mar 2025'
  },
  {
    src: '/certificates/ui-design.webp',
    link: 'https://member.codingstudio.id/certificate/tffhwn7aEr',
    title: 'Fundamental UI Design',
    description: 'Coding Studio • Nov 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/98XW5GDVLPM3',
    title: 'Web Application Fundamentals (React)',
    description: 'Dicoding • Sep 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/07Z64VO8RPQR',
    title: 'Building Web Applications (React)',
    description: 'Dicoding • Aug 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/N9ZOMRLJYPG5',
    title: 'Front-End Web Developer Expert',
    description: 'Dicoding • Aug 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/L4PQ5GNGQZO1',
    title: 'Intermediate Front-End Web Tools',
    description: 'Dicoding • Jul 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/EYX4J649WZDL',
    title: 'Fundamental Front-End Web',
    description: 'Dicoding • May 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/JLX14DMGJX72',
    title: 'Basic JavaScript Programming',
    description: 'Dicoding • Apr 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/6RPNYWQ64Z2M',
    title: 'Beginner Front-End Web',
    description: 'Dicoding • Apr 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.webp',
    link: 'https://www.dicoding.com/certificates/NVP77M9KVPR0',
    title: 'Basic Web Programming',
    description: 'Dicoding • Mar 2024'
  },
  {
    src: '/certificates/myskill-placeholder.webp',
    link: '/certificates/myskill-data-analysis.pdf',
    title: 'Data Analysis: Fullstack Bootcamp',
    description: 'MySkill • Mar 2024'
  },
  {
    src: '/certificates/myskill-placeholder.webp',
    link: '/certificates/myskill-data-analyst-mentoring.pdf',
    title: 'Data Analyst Mentoring',
    description: 'MySkill • Feb 2024'
  },
  {
    src: '/certificates/myskill-placeholder.webp',
    link: '/certificates/myskill-excel-basic.pdf',
    title: 'Microsoft Excel Basic',
    description: 'MySkill • Dec 2023'
  },
  {
    src: '/certificates/myskill-placeholder.webp',
    link: '/certificates/myskill-excel-intermediate.pdf',
    title: 'Microsoft Excel Intermediate',
    description: 'MySkill • Dec 2023'
  },
  {
    src: '/certificates/smk-placeholder.webp',
    link: '#',
    title: 'Japanese Language (Beginner)',
    description: 'SMK Negeri 2 Karanganyar • Jun 2021'
  },
  {
    src: '/certificates/smk-placeholder.webp',
    link: '#',
    title: 'Software Engineering Competency',
    description: 'SMK Negeri 2 Karanganyar • May 2021'
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 h-screen relative bg-[#F5F4F0] overflow-hidden flex flex-col items-center justify-center">
       {/* Ambient Background Depth */}
       <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,112,42,0.08)_0%,transparent_70%)]" />
       
       {/* Section Header */}
       <div className="absolute top-16 left-6 md:left-12 z-10 pointer-events-none">
            <h2 className="text-sm text-[#e8702a] uppercase tracking-[0.3em] font-cinzel border-l-2 border-[#e8702a] pl-4">
              Certifications
            </h2>
       </div>

       <div className="w-full h-full relative z-1">
            <DomeGallery 
                images={certificates} 
                fit={1.2} 
                minRadius={1200} // Larger radius = less dramatic curve, more elegant
                dragSensitivity={15}
                overlayBlurColor="#F5F4F0"
                openedImageWidth="85vw"
                openedImageHeight="65vh"
                grayscale={false} 
            />
       </div>
    </section>
  );
}
