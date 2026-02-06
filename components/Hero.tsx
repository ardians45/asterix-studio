"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastRenderedFrame = useRef<number>(-1);
  const rafId = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameCount = 80;
  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  // Title Animations: Fade In + Slide Up + Slight Scale Out
  const opacityTitle = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const yTitle = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const blurTitle = useTransform(scrollYProgress, [0, 0.15], ["0px", "10px"]);
  const scaleTitle = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // Slogan 1: Staggered Reveal
  const opacityS1_L1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const yS1_L1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [50, 0, -50]);
  const blurS1_L1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], ["10px", "0px", "10px"]);

  const opacityS1_L2 = useTransform(scrollYProgress, [0.18, 0.28, 0.38], [0, 1, 0]);
  const yS1_L2 = useTransform(scrollYProgress, [0.18, 0.28, 0.38], [50, 0, -50]);
  const blurS1_L2 = useTransform(scrollYProgress, [0.18, 0.28, 0.38], ["10px", "0px", "10px"]);

  const opacityS1_L3 = useTransform(scrollYProgress, [0.21, 0.31, 0.41], [0, 1, 0]);
  const yS1_L3 = useTransform(scrollYProgress, [0.21, 0.31, 0.41], [50, 0, -50]);
  const blurS1_L3 = useTransform(scrollYProgress, [0.21, 0.31, 0.41], ["10px", "0px", "10px"]);
  
  // Slogan 2: Staggered Reveal
  const opacityS2_L1 = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]);
  const yS2_L1 = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [50, 0, -50]);
  const blurS2_L1 = useTransform(scrollYProgress, [0.45, 0.55, 0.65], ["10px", "0px", "10px"]);

  const opacityS2_L2 = useTransform(scrollYProgress, [0.48, 0.58, 0.68], [0, 1, 0]);
  const yS2_L2 = useTransform(scrollYProgress, [0.48, 0.58, 0.68], [50, 0, -50]);
  const blurS2_L2 = useTransform(scrollYProgress, [0.48, 0.58, 0.68], ["10px", "0px", "10px"]);

  const opacityS2_L3 = useTransform(scrollYProgress, [0.51, 0.61, 0.71], [0, 1, 0]);
  const yS2_L3 = useTransform(scrollYProgress, [0.51, 0.61, 0.71], [50, 0, -50]);
  const blurS2_L3 = useTransform(scrollYProgress, [0.51, 0.61, 0.71], ["10px", "0px", "10px"]);

  // Loading State
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.webp`;
          img.onload = () => {
              setLoadingProgress(prev => prev + 1);
              resolve();
          };
          loadedImages[i] = img;
        });
        promises.push(p);
      }

      await Promise.all(promises);
      imagesRef.current = loadedImages;
      setIsLoaded(true);
    };

    loadImages();

    return () => {
        if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const renderFrame = (index: number) => {
    if (index === lastRenderedFrame.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false }); // Optimization: no alpha
    const img = imagesRef.current[index];
    
    if (!canvas || !ctx || !img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgAspect = img.width / img.height;
    const canvasAspect = canvasWidth / canvasHeight;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvasHeight - drawHeight) / 2;
    } else {
        drawWidth = canvasHeight * imgAspect;
        drawHeight = canvasHeight;
        offsetX = (canvasWidth - drawWidth) / 2;
        offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedFrame.current = index;
  };

  useMotionValueEvent(currentIndex, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.floor(latest);
    
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => renderFrame(frameIndex));
  });

  useEffect(() => {
    const handleResize = () => {
        if(canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            if(isLoaded) renderFrame(Math.floor(currentIndex.get()));
        }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        <div className="absolute inset-0 z-[5] pointer-events-none opacity-25 mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] text-white z-50">
                 <div className="w-48 h-[2px] bg-white/10 mb-6 relative overflow-hidden">
                    <motion.div 
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                        initial={{ width: 0 }}
                        animate={{ width: `${(loadingProgress / frameCount) * 100}%` }}
                    />
                 </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Syncing Neural Sequence // {Math.round((loadingProgress / frameCount) * 100)}%
                </span>
            </div>
        )}
        
        <motion.div 
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent z-40 origin-center opacity-30"
        />

        <motion.div 
            style={{ opacity: opacityTitle, y: yTitle, filter: `blur(${blurTitle})`, scale: scaleTitle }} 
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-4"
        >
             <h1 className="text-[#F5F5F2] mix-blend-difference mb-8 drop-shadow-2xl flex flex-col items-center">
                 <div className="flex items-start overflow-hidden py-4">
                    <span className="text-[12vw] md:text-[10vw] font-[family-name:var(--font-montserrat)] font-extrabold tracking-[-0.05em] leading-[0.8] block">ASTER</span>
                    <span className="text-[16vw] md:text-[14vw] font-[family-name:var(--font-montserrat)] font-extrabold tracking-[-0.05em] leading-[0.7] block -mt-2">IX</span>
                 </div>
                 <span className="text-[5vw] md:text-[3.5vw] font-[family-name:var(--font-montserrat)] font-extrabold text-[#F5F5F2] tracking-[0.4em] -mt-4">STUDIO</span>
             </h1>
             <p className="text-[#CFCAC2] text-[10px] md:text-xs font-[family-name:var(--font-montserrat)] font-medium tracking-[0.8em] uppercase mix-blend-difference">
                 Creative engineering & Digital Arts
             </p>
             
             <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute bottom-12 flex flex-col items-center gap-4"
             >
                <div className="w-[1px] h-16 bg-gradient-to-b from-[#BFA36A]/0 via-[#BFA36A] to-[#BFA36A]/0" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-[#BFA36A] font-mono">Execute Scroll</span>
             </motion.div>
        </motion.div>

        {/* Slogan 1: Staggered */}
        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-32 z-10 pointer-events-none">
             <h2 className="text-white text-5xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] md:leading-[0.85] max-w-5xl mix-blend-difference flex flex-col items-start gap-2 md:gap-4">
                 <motion.span style={{ opacity: opacityS1_L1, y: yS1_L1, filter: `blur(${blurS1_L1})` }} className="block">
                    CRAFTING
                 </motion.span>
                 <motion.span style={{ opacity: opacityS1_L2, y: yS1_L2, filter: `blur(${blurS1_L2})` }} className="block">
                    <span className="italic font-light text-white/50 tracking-tight">IMMERSIVE</span>
                 </motion.span>
                 <motion.span style={{ opacity: opacityS1_L3, y: yS1_L3, filter: `blur(${blurS1_L3})` }} className="block">
                    DIGITAL REALMS.
                 </motion.span>
             </h2>
        </div>

        {/* Slogan 2: Staggered */}
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-32 z-10 pointer-events-none text-right">
             <h2 className="text-white text-5xl md:text-8xl lg:text-9xl font-display font-black leading-[0.9] md:leading-[0.85] max-w-5xl mix-blend-difference flex flex-col items-end gap-2 md:gap-4">
                 <motion.span style={{ opacity: opacityS2_L1, y: yS2_L1, filter: `blur(${blurS2_L1})` }} className="block">
                    ENGINEERED
                 </motion.span>
                 <motion.span style={{ opacity: opacityS2_L2, y: yS2_L2, filter: `blur(${blurS2_L2})` }} className="block">
                    FOR <span className="italic font-light text-white/50 tracking-tight">LIMITLESS</span>
                 </motion.span>
                 <motion.span style={{ opacity: opacityS2_L3, y: yS2_L3, filter: `blur(${blurS2_L3})` }} className="block">
                    PERFORMANCE.
                 </motion.span>
             </h2>
        </div>

      </div>
    </div>
  );
}
