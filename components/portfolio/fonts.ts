import { Archivo, Mr_Dafoe } from "next/font/google";

// Heavy grotesk for the giant wordmarks and statements.
export const pfDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-pf-display",
  display: "swap",
});

// Heavy brush script that overlaps the grotesk ("Ardian" + "setiawan").
export const pfScript = Mr_Dafoe({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pf-script",
  display: "swap",
});

export const pfFontVars = `${pfDisplay.variable} ${pfScript.variable}`;
