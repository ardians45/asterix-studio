"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { clients } from "./data";

// Resting pose and fan pose per card: x/y in px from the centre of the stack, rotation in deg.
const POSES = [
  [-70, -30, -14, -200, -30, -20],
  [-40, 10, -8, -125, 0, -12],
  [-10, -10, -2, -42, -20, -4],
  [20, 15, 5, 42, 0, 4],
  [50, -15, 10, 125, -20, 12],
  [80, 20, 15, 200, 10, 20],
];

const FLAT = clients.flatMap((c, ci) => c.photos.map((_, pi) => ({ ci, pi })));

const FOCUSABLE = 'button, a[href], [tabindex]:not([tabindex="-1"])';

export default function ClientStack() {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [ci, setCi] = useState(0);
  const [pi, setPi] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const go = useCallback(
    (dir: 1 | -1) => {
      const cur = FLAT.findIndex((f) => f.ci === ci && f.pi === pi);
      const next = FLAT[(cur + dir + FLAT.length) % FLAT.length];
      setCi(next.ci);
      setPi(next.pi);
    },
    [ci, pi],
  );

  // Lock page scroll while open
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = prev;
    };
  }, [open, lenis]);

  // Focus management and keyboard
  useEffect(() => {
    if (!open) return;
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab" && node) {
        const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (!node.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, go]);

  // Give focus back to the opener after closing
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) wasOpen.current = true;
    else if (wasOpen.current) openerRef.current?.focus({ preventScroll: true });
  }, [open]);

  const openStack = (e: React.MouseEvent<HTMLElement>) => {
    openerRef.current = e.currentTarget;
    setCi(0);
    setPi(0);
    setOpen(true);
  };

  const client = clients[ci];
  const photo = client.photos[pi];

  return (
    <>
      <button type="button" className="pf-cs" onClick={openStack} aria-haspopup="dialog">
        <span className="pf-cs-text">
          <span className="pf-label pf-cs-label">Freelance</span>
          <span className="pf-cs-title">Client websites · Asterix Studio</span>
          <span className="pf-cs-sub">{clients.length} clients · 2024–2026</span>
          <span className="pf-cs-cta">Open the stack ↗</span>
        </span>
        <span className="pf-cs-stack" aria-hidden="true">
          {clients.map((c, i) => {
            const p = POSES[i];
            return (
              <Image
                key={c.name}
                src={c.photos[0].src}
                alt=""
                width={300}
                height={188}
                sizes="(min-width: 768px) 300px, 200px"
                loading="lazy"
                className="pf-cs-shot"
                style={
                  {
                    "--x": `${p[0]}px`,
                    "--y": `${p[1]}px`,
                    "--r": `${p[2]}deg`,
                    "--hx": `${p[3]}px`,
                    "--hy": `${p[4]}px`,
                    "--hr": `${p[5]}deg`,
                    zIndex: i,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="pf-cm"
            role="dialog"
            aria-modal="true"
            aria-label="Client websites"
            ref={dialogRef}
            onClick={(e) => {
              const t = e.target as HTMLElement;
              if (t === e.currentTarget || t.dataset.backdrop) close();
            }}
          >
            <button type="button" className="pf-cm-x" aria-label="Close" onClick={close} data-autofocus>
              <span aria-hidden="true">×</span>
            </button>
            <div className="pf-cm-stage" data-backdrop="1">
              <button type="button" className="pf-cm-arr" aria-label="Previous photo" onClick={() => go(-1)}>
                <span aria-hidden="true">‹</span>
              </button>
              <div className="pf-cm-view" data-backdrop="1">
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={`${client.name} website, screenshot ${pi + 1} of ${client.photos.length}`}
                  width={photo.w}
                  height={photo.h}
                  sizes="100vw"
                  className="pf-cm-big"
                />
              </div>
              <button type="button" className="pf-cm-arr" aria-label="Next photo" onClick={() => go(1)}>
                <span aria-hidden="true">›</span>
              </button>
            </div>
            <div className="pf-cm-dots" role="group" aria-label="Clients">
              {clients.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  className="pf-cm-dot"
                  aria-label={c.name}
                  aria-current={i === ci}
                  onClick={() => {
                    setCi(i);
                    setPi(0);
                  }}
                />
              ))}
            </div>
            <div className="pf-cm-info" data-backdrop="1">
              <div className="pf-cm-thumbs">
                {client.photos.map((ph, i) => (
                  <button
                    key={ph.src}
                    type="button"
                    className="pf-cm-thumb"
                    aria-label={`Photo ${i + 1} of ${client.name}`}
                    aria-current={i === pi}
                    onClick={() => setPi(i)}
                  >
                    <Image src={ph.src} alt="" width={72} height={46} sizes="72px" />
                  </button>
                ))}
              </div>
              <h3 className="pf-cm-name">{client.name}</h3>
              <p className="pf-cm-kind">{client.kind}</p>
              {client.impact && <span className="pf-cm-chip">{client.impact}</span>}
              {client.url && (
                <a className="pf-cm-visit" href={client.url} target="_blank" rel="noopener noreferrer">
                  Visit site ↗
                </a>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
