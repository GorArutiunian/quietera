import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quietera.vercel.app"),
  title: {
    default: "QuietEra — Custom-fit sleep earplugs",
    template: "%s · QuietEra",
  },
  description:
    "Next-generation in-ear sleep earplugs. Custom fit. Full noise blocking. Medical-grade silicone that stays in place all night.",
  keywords: [
    "sleep earplugs",
    "noise blocking earplugs",
    "quietera",
    "snoring earplugs",
    "custom fit earplugs",
  ],
  openGraph: {
    title: "QuietEra — Silence. Comfort. Every night.",
    description:
      "Custom-fit sleep earplugs that mold to your ear and seal the noise until morning.",
    type: "website",
    images: [{ url: "/images/hero-product.jpg", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuietEra — Silence. Comfort. Every night.",
    description: "Custom-fit sleep earplugs. Full noise blocking.",
    images: ["/images/hero-product.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${bodoni.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('quietera-theme');if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col pb-20 md:pb-0">
        <Providers>
          <main id="main" className="flex-1">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
