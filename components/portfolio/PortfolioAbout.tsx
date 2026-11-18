"use client";

import { useEffect, useRef, useState } from "react";
import Lanyard, { StaticCard } from "@/components/lanyard/Lanyard";

export default function PortfolioAbout() {
  const ref = useRef<HTMLElement>(null);
  const [mount, setMount] = useState(false);
  const [active, setActive] = useState(false);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // load the 3D chunk about one screen before the section shows up
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMount(true);
          near.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );
    // run physics + render only while it is on screen
    const visible = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    near.observe(el);
    visible.observe(el);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[var(--pf-butter)] text-[var(--pf-ink)] lg:h-[100svh] lg:min-h-[640px]"
    >
      <div className="pf-shell lg:grid lg:h-full lg:grid-cols-[45fr_55fr] lg:items-stretch">
        {/* name tag: 3D on desktop (lazy), static card below 1024px */}
        <div className="hidden lg:block lg:h-full">
          {wide && <Lanyard mount={mount} active={active} theme="butter" />}
        </div>
        <div className="pt-20 lg:hidden">
          <StaticCard theme="butter" />
        </div>

        <div className="py-20 lg:flex lg:flex-col lg:justify-center lg:py-0 lg:pl-[4%]">
          <h2 className="pf-tagline mb-4">Who I am</h2>
          {/* kalimatnya lebih panjang dari versi lama: ukuran dibatasi supaya muat satu layar di samping name tag */}
          <p className="pf-statement !text-[clamp(1.6rem,2.7vw,2.6rem)] !leading-[1.08]">
            Ardian is a software engineer who works with AI, not around it. Informatics keeps the fundamentals sharp, a UI/UX background keeps the user in view, and a crew of AI agents turns the plan into shipped work.
          </p>
          <p className="pf-label mt-8">
            Informatics · Universitas Pamulang &nbsp;·&nbsp; Asterix Studio since 2023 &nbsp;·&nbsp; South Tangerang
          </p>
        </div>
      </div>
    </section>
  );
}
