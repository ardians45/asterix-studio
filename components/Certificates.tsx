"use client";

import DomeGallery from "./DomeGallery";

const certificates = [
  {
    src: '/certificates/python-intermediate.png',
    link: 'https://www.sololearn.com/certificates/CC-VEXTCHGO',
    title: 'Python Intermediate',
    description: 'Sololearn • Apr 2025'
  },
  {
    src: '/certificates/python-intro.png',
    link: 'https://www.sololearn.com/certificates/CC-HBT71LPZ',
    title: 'Introduction to Python',
    description: 'Sololearn • Mar 2025'
  },
  {
    src: '/certificates/ui-design.png',
    link: 'https://member.codingstudio.id/certificate/tffhwn7aEr',
    title: 'Fundamental UI Design',
    description: 'Coding Studio • Nov 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/98XW5GDVLPM3',
    title: 'Fundamental Aplikasi Web (React)',
    description: 'Dicoding • Sep 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/07Z64VO8RPQR',
    title: 'Membuat Aplikasi Web (React)',
    description: 'Dicoding • Aug 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/N9ZOMRLJYPG5',
    title: 'Front-End Web Developer Expert',
    description: 'Dicoding • Aug 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/L4PQ5GNGQZO1',
    title: 'Tools Front-End Web Intermediate',
    description: 'Dicoding • Jul 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/EYX4J649WZDL',
    title: 'Fundamental Front-End Web',
    description: 'Dicoding • May 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/JLX14DMGJX72',
    title: 'Dasar Pemrograman JavaScript',
    description: 'Dicoding • Apr 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/6RPNYWQ64Z2M',
    title: 'Front-End Web Pemula',
    description: 'Dicoding • Apr 2024'
  },
  {
    src: '/certificates/dicoding-placeholder.png',
    link: 'https://www.dicoding.com/certificates/NVP77M9KVPR0',
    title: 'Dasar Pemrograman Web',
    description: 'Dicoding • Mar 2024'
  },
  {
    src: '/certificates/myskill-placeholder.png',
    link: '/certificates/myskill-data-analysis.pdf',
    title: 'Data Analysis: Fullstack Bootcamp',
    description: 'MySkill • Mar 2024'
  },
  {
    src: '/certificates/myskill-placeholder.png',
    link: '/certificates/myskill-data-analyst-mentoring.pdf',
    title: 'Data Analyst Mentoring',
    description: 'MySkill • Feb 2024'
  },
  {
    src: '/certificates/myskill-placeholder.png',
    link: '/certificates/myskill-excel-basic.pdf',
    title: 'Microsoft Excel Basic',
    description: 'MySkill • Dec 2023'
  },
  {
    src: '/certificates/myskill-placeholder.png',
    link: '/certificates/myskill-excel-intermediate.pdf',
    title: 'Microsoft Excel Intermediate',
    description: 'MySkill • Dec 2023'
  },
  {
    src: '/certificates/smk-placeholder.png',
    link: '#',
    title: 'Japanese Language (Beginner)',
    description: 'SMK Negeri 2 Karanganyar • Jun 2021'
  },
  {
    src: '/certificates/smk-placeholder.png',
    link: '#',
    title: 'Software Engineering Competency',
    description: 'SMK Negeri 2 Karanganyar • May 2021'
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 h-screen relative bg-[#060010] overflow-hidden flex flex-col items-center justify-center">
       {/* Ambient Background Depth */}
       <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(40,20,80,0.15)_0%,transparent_70%)]" />
       
       {/* Section Header */}
       <div className="absolute top-16 left-6 md:left-12 z-10 pointer-events-none">
            <h2 className="text-sm text-gray-400 uppercase tracking-[0.3em] font-mono border-l-2 border-purple-500/50 pl-4">
              Certifications
            </h2>
       </div>

       <div className="w-full h-full relative z-1">
            <DomeGallery 
                images={certificates} 
                fit={1.2} 
                minRadius={1200} // Larger radius = less dramatic curve, more elegant
                dragSensitivity={15}
                overlayBlurColor="#060010"
                openedImageWidth="85vw"
                openedImageHeight="65vh"
                grayscale={false} 
            />
       </div>
    </section>
  );
}
