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

  const frameCount = 161;
  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

  // Scroll-driven Opacity & Transforms
  const opacityTitle = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 0.8, 0]);
  const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const blurTitle = useTransform(scrollYProgress, [0, 0.1], ["0px", "20px"]);

  const opacitySlogan1 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const blurSlogan1 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], ["20px", "0px", "20px"]);
  const ySlogan1 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [40, 0, -40]);
  
  const opacitySlogan2 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const blurSlogan2 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], ["20px", "0px", "20px"]);
  const ySlogan2 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [40, 0, -40]);

  const opacityCTA = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const scaleCTA = useTransform(scrollYProgress, [0.85, 0.95], [0.9, 1]);
  const blurCTA = useTransform(scrollYProgress, [0.85, 0.95], ["20px", "0px"]);
  const pointerEventsCTA = useTransform(scrollYProgress, (v) => v > 0.85 ? "auto" : "none");

  // Loading State
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const p = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
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
            style={{ opacity: opacityTitle, y: yTitle, filter: `blur(${blurTitle})` }} 
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

        <motion.div 
             style={{ opacity: opacitySlogan1, filter: blurSlogan1 as any, y: ySlogan1 }}
             className="absolute inset-0 flex items-center justify-start px-6 md:px-32 z-10 pointer-events-none"
        >
             <h2 className="text-white text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.85] max-w-5xl mix-blend-difference">
                 CRAFTING <br />
                 <span className="italic font-light text-white/50 tracking-tight">IMMERSIVE</span> <br />
                 DIGITAL REALMS.
             </h2>
        </motion.div>

        <motion.div 
             style={{ opacity: opacitySlogan2, filter: blurSlogan2 as any, y: ySlogan2 }}
             className="absolute inset-0 flex items-center justify-end px-6 md:px-32 z-10 pointer-events-none text-right"
        >
             <h2 className="text-white text-6xl md:text-8xl lg:text-9xl font-display font-black leading-[0.85] max-w-5xl mix-blend-difference">
                 ENGINEERED <br />
                 FOR <span className="italic font-light text-white/50 tracking-tight">LIMITLESS</span> <br />
                 PERFORMANCE.
             </h2>
        </motion.div>

        <motion.div 
             style={{ opacity: opacityCTA, scale: scaleCTA, filter: blurCTA as any, pointerEvents: pointerEventsCTA }}
             className="absolute inset-0 flex flex-col items-center justify-center z-20"
        >
             <h2 className="text-white text-4xl md:text-6xl font-display font-black mb-16 text-center leading-[0.9] mix-blend-difference">
                 READY TO <br/>
                 <span className="italic font-light text-white/50">IGNITE</span> YOUR <br/>
                 NEXT PROJECT?
             </h2>
             
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-none transition-all hover:bg-black hover:text-white duration-500 overflow-hidden"
             >
                <span className="relative z-10">Initiate Contact</span>
                <div className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-500" />
             </motion.button>
        </motion.div>

      </div>
    </div>
  );
}
