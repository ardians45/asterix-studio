import { Archivo, Yellowtail, IBM_Plex_Mono } from "next/font/google";

// Heavy grotesk for the giant wordmarks and statements.
export const pfDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-pf-display",
  display: "swap",
});

// Monoline script that overlaps the grotesk ("Ardian" + "setiawan").
export const pfScript = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pf-script",
  display: "swap",
});

// Small technical labels.
export const pfMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-pf-mono",
  display: "swap",
});

export const pfFontVars = `${pfDisplay.variable} ${pfScript.variable} ${pfMono.variable}`;
