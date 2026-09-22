"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { IconBag, IconClose, IconMenu } from "@/components/icons";
import { ThemeToggle } from "@/components/theme";

const LINKS = [
  { href: "/#models", label: "Models" },
  { href: "/#how", label: "How it works" },
  { href: "/#colors", label: "Colors" },
  { href: "/#shop", label: "Shop" },
  { href: "/#faq", label: "FAQ" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-baseline gap-0.5 ${className}`}>
      <span className="font-serif text-[1.55rem] leading-none tracking-tight text-paper">
        Quiet
      </span>
      <span className="font-serif text-[1.55rem] leading-none tracking-tight text-ice-2">
        Era
      </span>
      <span className="ml-1 align-super text-[0.6rem] tracking-[0.18em] text-muted">
        TM
      </span>
    </Link>
  );
}

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-line backdrop-blur-xl" style={{ background: "var(--header)" }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 text-[0.92rem] text-ice/80 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={home ? l.href : l.href} className="transition-colors hover:text-paper">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="hover-fill relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-ice"
            aria-label={`Open bag, ${count} items`}
            onClick={() => setOpen(true)}
          >
            <IconBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-blue px-1 text-[10px] font-medium text-white">
                {count}
              </span>
            )}
          </button>
          <a
            href="/#shop"
            className="hidden min-h-11 items-center rounded-full bg-blue px-4 text-sm font-medium text-white transition-colors hover:bg-blue-bright sm:inline-flex"
          >
            Shop now
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-ice md:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="border-t border-line px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover-fill rounded-xl px-3 py-3 text-paper"
                onClick={() => setMenu(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Next-generation in-ear sleep earplugs. Custom fit. Full noise blocking.
            Your personal noise shield.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ice-2">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><a href="/#shop" className="hover:text-paper">QuietEra Pair</a></li>
            <li><a href="/#shop" className="hover:text-paper">Couple Pack</a></li>
            <li><a href="/#colors" className="hover:text-paper">Colors</a></li>
            <li><a href="/#reviews" className="hover:text-paper">Reviews</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ice-2">Help</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li><a href="/#faq" className="hover:text-paper">FAQ</a></li>
            <li><Link href="/shipping" className="hover:text-paper">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-paper">30-night returns</Link></li>
            <li><Link href="/privacy" className="hover:text-paper">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-paper">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} QuietEra. All rights reserved.</p>
          <p>Designed for sleep. Not a medical device.</p>
        </div>
      </div>
    </footer>
  );
}
