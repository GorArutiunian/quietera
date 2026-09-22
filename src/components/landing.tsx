"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-context";
import {
  IconCheck,
  IconChevron,
  IconCloud,
  IconLeaf,
  IconMoon,
  IconShield,
  IconSoundOff,
  IconStar,
} from "@/components/icons";
import { BuyCard } from "@/components/buy-card";
import {
  CATEGORIES,
  COLORS,
  COMPARISON,
  DEFAULT_CONFIG,
  FAQS,
  FEATURES,
  GALLERY,
  PRODUCT,
  REVIEWS,
  STEPS,
  formatMoney,
} from "@/lib/product";

function Stars({ n = 5, className = "h-4 w-4 text-gold" }: { n?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className={`${className} ${i < n ? "opacity-100" : "opacity-25"}`} />
      ))}
    </span>
  );
}

export function Landing() {
  const [shot, setShot] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const current = GALLERY[shot];
  const { add, count, setOpen } = useCart();

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Product",
      name: PRODUCT.name,
      description: PRODUCT.tagline,
      brand: { "@type": "Brand", name: "QuietEra" },
      image: GALLERY.map((g) => g.src),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: PRODUCT.rating,
        reviewCount: PRODUCT.reviewCount,
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: PRODUCT.price,
        availability: "https://schema.org/InStock",
      },
    }),
    [],
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mesh relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-16">
          <div className="rise">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-ice-2">
              Next-generation sleep earplugs
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-[4.4rem]">
              Silence.
              <br />
              Comfort.
              <br />
              <span className="text-ice">Every night.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Custom-fit in-ear earplugs that mold to you, seal the noise, and stay put until morning.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <Stars />
              <span className="text-paper">{PRODUCT.rating} · {PRODUCT.reviewCount.toLocaleString()} reviews</span>
              <span className="text-muted">Loved by {PRODUCT.sold} sleepers</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="inline-flex min-h-12 items-center rounded-full bg-blue px-6 text-sm font-medium text-white hover:bg-blue-bright"
              >
                Shop QuietEra
              </a>
              <a
                href="#how"
                className="inline-flex min-h-12 items-center rounded-full border border-line px-6 text-sm text-paper hover:bg-white/5"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-16/10 overflow-hidden rounded-[2rem] border border-line bg-navy-3 shadow-[0_40px_120px_rgba(47,107,255,0.22)]">
              <Image
                src="/images/hero-product.jpg"
                alt="Pair of QuietEra sleep earplugs"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-5 left-6 right-6 hidden grid-cols-3 gap-2 sm:grid">
              {[
                { k: "37dB", v: "noise reduction*" },
                { k: "24mm", v: "flush profile" },
                { k: "8 hrs", v: "all-night seal" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-2xl px-3 py-3 text-center">
                  <p className="font-serif text-xl text-paper">{s.k}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-navy-2/80" aria-label="Trust">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6">
          {[
            { icon: IconSoundOff, t: "Blocks the night", d: "Snoring, traffic, neighbors" },
            { icon: IconShield, t: "Custom fit", d: "Molds to your ear" },
            { icon: IconCloud, t: "Ultra comfortable", d: "Medical-grade silicone" },
            { icon: IconMoon, t: "Stays in place", d: "All night, no dropping" },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-3">
              <item.icon className="mt-0.5 h-6 w-6 shrink-0 text-ice-2" />
              <div>
                <p className="text-sm font-medium">{item.t}</p>
                <p className="text-sm text-muted">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-16/9 overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/images/couple-sleep.jpg"
              alt="A couple sleeping — one person resting peacefully"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ice-2">The problem</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Foam fails. Wax fails. Sleep should not.
            </h2>
            <p className="mt-5 text-muted">
              Disposable foam expands until it aches. Wax melts. Cheap loops leak noise the moment you turn your head.
              QuietEra was built for the people who have tried everything and still wake at 2 a.m.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Partner snoring that wrecks the second half of the night",
                "City noise, thin walls, hotels, and early flights",
                "Earplugs that hurt, fall out, or look ridiculous in bed",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-navy-2/50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-ice-2">The product</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Designed like jewelry. Built like armor.</h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Translucent medical-grade silicone, a royal-blue expanding core, and a 24 × 18 mm ear-specific shell.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="relative aspect-16/10 overflow-hidden rounded-[2rem] border border-line bg-navy-3">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
              {GALLERY.map((g, i) => (
                <button
                  key={g.src}
                  type="button"
                  onClick={() => setShot(i)}
                  className={`relative aspect-square overflow-hidden rounded-2xl border ${
                    shot === i ? "border-blue" : "border-line"
                  }`}
                  aria-label={`Show image ${i + 1}`}
                  aria-pressed={shot === i}
                >
                  <Image src={g.src} alt="" fill className="object-cover" sizes="160px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="text-xs uppercase tracking-[0.24em] text-ice-2">How it works</p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl sm:text-5xl">Five seconds to a sealed night.</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s) => (
            <article key={s.n} className="overflow-hidden rounded-3xl border border-line bg-navy-2">
              <div className="relative aspect-4/3">
                <Image src={s.image} alt="" fill className="object-cover" sizes="240px" />
              </div>
              <div className="p-4">
                <p className="text-xs tracking-[0.2em] text-ice-2">{s.n}</p>
                <h3 className="mt-1 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-2/50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Inside QuietEra</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Three parts. One seal.</h2>
            <dl className="mt-8 space-y-6">
              {[
                { t: "Silicone shell", d: "Medical-grade, soft and flexible. Ear-specific left and right geometry." },
                { t: "Inner plug", d: "Expands inside the canal to fill the unique shape of your ear." },
                { t: "Activation cap", d: "Press to seal. The mechanism locks the noise out for the night." },
              ].map((row) => (
                <div key={row.t} className="border-t border-line pt-5">
                  <dt className="font-medium">{row.t}</dt>
                  <dd className="mt-1 text-sm text-muted">{row.d}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative aspect-16/9 overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/images/exploded-view.jpg"
              alt="QuietEra disassembled: shell, inner plug, and activation button"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Why it wins</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Everything a night of sleep needs.</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="glass rounded-3xl p-6">
              <h3 className="font-serif text-2xl">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-2/50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-serif text-4xl sm:text-5xl">QuietEra vs. the usual suspects</h2>
          <div className="mt-8 overflow-x-auto rounded-3xl border border-line">
            <table className="min-w-full text-left text-sm">
              <caption className="sr-only">Feature comparison of QuietEra, foam, and wax earplugs</caption>
              <thead className="bg-navy-3 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-4 font-medium"> </th>
                  <th className="px-4 py-4 font-medium text-ice">QuietEra</th>
                  <th className="px-4 py-4 font-medium">Foam</th>
                  <th className="px-4 py-4 font-medium">Wax</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? "bg-navy-2/40" : ""}>
                    <th className="px-4 py-4 font-medium text-paper">{row.label}</th>
                    <td className="px-4 py-4 text-ice">{row.quietera}</td>
                    <td className="px-4 py-4 text-muted">{row.foam}</td>
                    <td className="px-4 py-4 text-muted">{row.wax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="models" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Categories</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Five models. Pick your night.</h2>
        <p className="mt-4 max-w-xl text-muted">
          Each line has its own noise rating, materials, and colorways — prices change with the spec you build.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <a key={c.id} href="#shop" className="group overflow-hidden rounded-3xl border border-line bg-navy-2">
              <div className="relative aspect-4/3">
                <Image src={c.image} alt="" fill className="object-cover transition-transform group-hover:scale-105" sizes="220px" />
              </div>
              <div className="p-4">
                <p className="font-serif text-2xl">{c.name}</p>
                <p className="mt-1 text-xs text-muted">{c.short}</p>
                <p className="mt-3 text-sm">{c.nrr} · from {formatMoney(c.base)}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="colors" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Colorways</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Seven finishes. Priced by rarity.</h2>
            <p className="mt-4 text-muted">
              Core colors are included. Sand and Sage are seasonal. Rose is new. Aurora is a limited iridescent run.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
              {COLORS.map((c) => (
                <figure key={c.id} className="overflow-hidden rounded-2xl border border-line">
                  <div className="relative aspect-square">
                    <Image src={c.image} alt={`${c.label} QuietEra earplug`} fill className="object-cover" sizes="200px" />
                  </div>
                  <figcaption className="px-3 py-2 text-center text-sm">
                    {c.label}
                    <span className="block text-xs text-muted">
                      {c.extra ? `+${formatMoney(c.extra)}` : "Included"}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="relative aspect-16/9 overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/images/color-options.jpg"
              alt="QuietEra color lineup: blue, clear, and black"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-navy-2/50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/images/case-open.jpg"
              alt="White QuietEra travel case open with a pair inside"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ice-2">In the box</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Ready the first night.</h2>
            <ul className="mt-6 space-y-4">
              {[
                "1 pair of QuietEra sleep earplugs (left + right)",
                "Premium compact travel case",
                "Quick-start guide",
                "30-night sleep guarantee card",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm">
                  <IconLeaf className="mt-0.5 h-5 w-5 shrink-0 text-ice-2" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Social proof</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Sleepers, reporting for duty.</h2>
          </div>
          <p className="text-sm text-muted">
            {PRODUCT.rating} average · {PRODUCT.reviewCount.toLocaleString()} verified reviews
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="flex flex-col rounded-3xl border border-line bg-navy-2 p-6">
              <Stars n={r.stars} />
              <p className="mt-4 font-serif text-2xl leading-snug">{r.title}</p>
              <p className="mt-3 flex-1 text-sm text-muted">{r.body}</p>
              <footer className="mt-5 text-sm">
                <span className="font-medium">{r.name}</span>
                <span className="text-muted"> · {r.city}</span>
                {r.verified && (
                  <span className="ml-2 text-xs uppercase tracking-wider text-ok">Verified</span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="shop" className="bg-navy-2/50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Shop</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Better sleep starts here.</h2>
            <p className="mt-4 max-w-md text-muted">
              Build your pair: category, color, size, and material. The price updates live. Travel case included.
            </p>
            <div className="relative mt-8 aspect-4/3 overflow-hidden rounded-[2rem] border border-line">
              <Image
                src="/images/lifestyle-sleep.jpg"
                alt="Peaceful sleep with QuietEra"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <BuyCard />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="glass rounded-[2rem] px-6 py-10 text-center sm:px-12">
          <h2 className="font-serif text-4xl">Sleep 30 nights on us.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            If QuietEra does not give you quieter nights, send it back. Full refund. We will even cover return shipping in the US.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Free shipping over $50", d: "Most orders land in 2–5 business days." },
              { t: "Easy returns", d: "30 nights. No restocking fee. No lecture." },
              { t: "Secure checkout", d: "Encrypted payment. Packed in unmarked boxes." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-line p-5">
                <p className="font-medium">{x.t}</p>
                <p className="mt-1 text-sm text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:py-28">
        <h2 className="text-center font-serif text-4xl sm:text-5xl">Questions, answered</h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {FAQS.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  <span className="font-medium">{item.q}</span>
                  <IconChevron className={`h-5 w-5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          *Laboratory-style attenuation varies by fit and frequency. QuietEra is not a medical device.
        </p>
      </section>

      <section className="mesh border-t border-line">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <h2 className="font-serif text-5xl leading-tight sm:text-6xl">
            The quietest thing you can buy for your night.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted">
            Custom fit. Full noise blocking. A travel case that lives on the nightstand.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => add(DEFAULT_CONFIG)}
              className="inline-flex min-h-12 items-center rounded-full bg-blue px-7 text-sm font-medium text-white hover:bg-blue-bright"
            >
              Add Sleep Couple Pack
            </button>
            <a
              href="#shop"
              className="inline-flex min-h-12 items-center rounded-full border border-line px-7 text-sm hover:bg-white/5"
            >
              Choose a color
            </a>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-[rgba(7,11,22,0.92)] p-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">QuietEra · from {formatMoney(39)}</p>
            <p className="text-xs text-muted">30-night guarantee</p>
          </div>
          {count > 0 ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex min-h-11 items-center rounded-full bg-blue px-5 text-sm font-medium text-white"
            >
              View bag ({count})
            </button>
          ) : (
            <a
              href="#shop"
              className="inline-flex min-h-11 items-center rounded-full bg-blue px-5 text-sm font-medium text-white"
            >
              Shop now
            </a>
          )}
        </div>
      </div>
    </>
  );
}
