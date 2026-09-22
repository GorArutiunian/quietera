"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart-context";
import {
  CATEGORIES,
  COLORS,
  DEFAULT_CONFIG,
  MATERIALS,
  PACKS,
  SIZES,
  formatMoney,
  quote,
  type CategoryId,
  type ColorId,
  type Config,
  type MaterialId,
  type PackId,
  type SizeId,
} from "@/lib/product";
import { IconLock, IconShield, IconTruck } from "@/components/icons";

export function BuyCard({ initial }: { initial?: Partial<Config> }) {
  const { add } = useCart();
  const [cfg, setCfg] = useState<Config>({ ...DEFAULT_CONFIG, ...initial });
  const q = useMemo(() => quote(cfg), [cfg]);
  const colors = COLORS.filter((c) => q.cat.colors.includes(c.id));
  const mats = MATERIALS.filter((m) => q.cat.materials.includes(m.id));

  function setCategory(id: CategoryId) {
    const cat = CATEGORIES.find((c) => c.id === id)!;
    setCfg((prev) => ({
      ...prev,
      category: id,
      color: cat.colors.includes(prev.color) ? prev.color : cat.colors[0],
      material: cat.materials.includes(prev.material) ? prev.material : cat.materials[0],
    }));
  }

  return (
    <div className="glass glow rounded-3xl p-5 sm:p-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-ice-2">QuietEra {q.cat.name}</p>
          <p className="mt-1 font-serif text-3xl">{formatMoney(q.price)}</p>
        </div>
        <p className="text-sm text-muted line-through">{formatMoney(q.compare)}</p>
      </div>
      <p className="mt-2 text-sm text-muted">
        {q.cat.nrr} · {q.cat.best} · {q.pack.pairs === 1 ? "1 pair" : `${q.pack.pairs} pairs`} + case
      </p>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Category</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-2xl border px-3 py-2 text-left text-sm transition-colors ${
                cfg.category === c.id ? "border-blue bg-blue/15" : "border-line hover:border-ice-2/40"
              }`}
            >
              <span className="block font-medium">{c.name}</span>
              <span className="text-xs text-muted">from {formatMoney(c.base)}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Color · {q.color.label}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {colors.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCfg((p) => ({ ...p, color: c.id as ColorId }))}
              className={`relative h-11 w-11 rounded-full border-2 ${
                cfg.color === c.id ? "border-paper" : "border-transparent"
              }`}
              style={{ background: c.hex, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)" }}
              aria-label={`${c.label}${c.extra ? `, +$${c.extra}` : ""}`}
              aria-pressed={cfg.color === c.id}
            >
              {c.badge && (
                <span className="absolute -right-2 -top-2 rounded-full bg-gold px-1.5 text-[9px] uppercase text-navy">
                  {c.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        {q.color.extra > 0 && (
          <p className="mt-2 text-xs text-gold">
            {q.color.label} adds {formatMoney(q.color.extra)}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Size</legend>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCfg((p) => ({ ...p, size: s.id as SizeId }))}
              className={`min-h-11 rounded-2xl border text-sm ${
                cfg.size === s.id ? "border-blue bg-blue/15" : "border-line hover:border-ice-2/40"
              }`}
            >
              {s.label}
              {s.extra > 0 ? <span className="block text-[10px] text-muted">+{formatMoney(s.extra)}</span> : null}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">{q.size.hint}</p>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Material</legend>
        <div className="mt-2 grid gap-2">
          {mats.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ${
                cfg.material === m.id ? "border-blue bg-blue/15" : "border-line hover:border-ice-2/40"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="material"
                  className="accent-blue"
                  checked={cfg.material === m.id}
                  onChange={() => setCfg((p) => ({ ...p, material: m.id as MaterialId }))}
                />
                <span>
                  <span className="block text-sm font-medium">{m.label}</span>
                  <span className="text-xs text-muted">{m.hint}</span>
                </span>
              </span>
              <span className="text-sm text-muted">{m.extra ? `+${formatMoney(m.extra)}` : "Included"}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium">Set</legend>
        <div className="mt-2 grid gap-2">
          {PACKS.map((p) => {
            const price = quote({ ...cfg, pack: p.id }).price;
            return (
              <label
                key={p.id}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 ${
                  cfg.pack === p.id ? "border-blue bg-blue/15" : "border-line hover:border-ice-2/40"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pack"
                    className="accent-blue"
                    checked={cfg.pack === p.id}
                    onChange={() => setCfg((x) => ({ ...x, pack: p.id as PackId }))}
                  />
                  <span>
                    <span className="block text-sm font-medium">{p.name}</span>
                    <span className="text-xs text-muted">{p.pairs} pair{p.pairs > 1 ? "s" : ""}</span>
                  </span>
                </span>
                <span className="text-right">
                  {p.badge && (
                    <span className="mb-1 block rounded-full bg-gold/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                      {p.badge}
                    </span>
                  )}
                  <span className="text-sm">{formatMoney(price)}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <dl className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-line p-3 text-xs text-muted sm:grid-cols-4">
        <div><dt>NRR</dt><dd className="text-paper">{q.cat.nrr}</dd></div>
        <div><dt>Size</dt><dd className="text-paper">{q.size.label}</dd></div>
        <div><dt>Material</dt><dd className="text-paper">{q.mat.label}</dd></div>
        <div><dt>Finish</dt><dd className="text-paper">{q.color.label}</dd></div>
      </dl>

      <button
        type="button"
        onClick={() => add(cfg)}
        className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-blue text-sm font-medium text-white hover:bg-blue-bright"
      >
        Add to bag · {formatMoney(q.price)}
      </button>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] uppercase tracking-wider text-muted">
        <span className="inline-flex items-center justify-center gap-1"><IconTruck className="h-4 w-4" /> Free $50+</span>
        <span className="inline-flex items-center justify-center gap-1"><IconShield className="h-4 w-4" /> 30 nights</span>
        <span className="inline-flex items-center justify-center gap-1"><IconLock className="h-4 w-4" /> Preorder</span>
      </div>
    </div>
  );
}
