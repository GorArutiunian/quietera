"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/cart-context";
import { formatMoney, quote } from "@/lib/product";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 6.95;
  const total = subtotal + shipping;

  const lines = useMemo(
    () => items.map((item) => ({ item, q: quote(item) })),
    [items],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (items.length === 0) {
      setError("Your bag is empty.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const name = String(form.get("name") || "");
    if (!email.includes("@") || name.trim().length < 2) {
      setError("Please add a valid name and email.");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    const order = `QE-${Math.floor(100000 + Math.random() * 900000)}`;
    sessionStorage.setItem(
      "quietera-order",
      JSON.stringify({ order, email, name, total, items }),
    );
    clear();
    router.push(`/success?order=${order}`);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="font-serif text-4xl">Preorder QuietEra</h1>
        <p className="mt-2 text-sm text-muted">
          Reserve your pair now. No payment today — we will email you when it ships.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          <fieldset className="space-y-4">
            <legend className="text-sm font-medium uppercase tracking-[0.16em] text-ice-2">
              Contact
            </legend>
            <label className="block text-sm">
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper"
              />
            </label>
            <label className="block text-sm">
              Full name
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper"
              />
            </label>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-sm font-medium uppercase tracking-[0.16em] text-ice-2">
              Shipping
            </legend>
            <label className="block text-sm">
              Address
              <input
                required
                name="address"
                autoComplete="street-address"
                className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                City
                <input
                  required
                  name="city"
                  autoComplete="address-level2"
                  className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper"
                />
              </label>
              <label className="block text-sm">
                Postal code
                <input
                  required
                  name="zip"
                  autoComplete="postal-code"
                  className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper"
                />
              </label>
            </div>
            <label className="block text-sm">
              Country
              <select
                name="country"
                autoComplete="country"
                className="mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper"
                defaultValue="US"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="AM">Armenia</option>
              </select>
            </label>
          </fieldset>

          <p className="rounded-2xl border border-line bg-navy-3/60 px-4 py-3 text-sm text-muted">
            This is a preorder. You will not be charged now. We confirm shipping details by email before anything ships.
          </p>

          {error && (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || items.length === 0}
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-blue text-sm font-medium text-white hover:bg-blue-bright disabled:opacity-40"
          >
            {busy ? "Reserving…" : `Place preorder · ${formatMoney(total)}`}
          </button>
        </form>
      </div>

      <aside className="h-fit rounded-3xl border border-line bg-navy-2 p-6">
        <h2 className="font-serif text-2xl">Preorder summary</h2>
        {lines.length === 0 ? (
          <p className="mt-4 text-sm text-muted">Nothing in the bag yet.</p>
        ) : (
          <ul className="mt-5 space-y-4">
            {lines.map(({ item, q }) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-navy-3">
                  <Image src={q.color.image} alt="" fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{q.cat.name} · {q.pack.name}</p>
                  <p className="text-muted">
                    {q.color.label} · {q.size.label} · Qty {item.qty}
                  </p>
                </div>
                <p className="text-sm">{formatMoney(item.unitPrice * item.qty)}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 space-y-1 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
          </div>
          <div className="flex justify-between pt-2 text-base font-medium">
            <span>Due at ship</span>
            <span>{formatMoney(total)}</span>
          </div>
          <p className="pt-3 text-xs text-muted">No charge today.</p>
        </div>
      </aside>
    </div>
  );
}
