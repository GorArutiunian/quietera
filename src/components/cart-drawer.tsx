"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-context";
import { IconClose } from "@/components/icons";
import { formatMoney, quote } from "@/lib/product";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();
  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 6.95;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-black/55" aria-label="Close bag" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-navy-2 shadow-2xl" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button type="button" className="hover-fill inline-flex min-h-11 min-w-11 items-center justify-center rounded-full" aria-label="Close bag" onClick={() => setOpen(false)}>
            <IconClose className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-muted">Your bag is empty. Silence is waiting.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const q = quote(item);
                return (
                  <li key={item.id} className="flex gap-3 rounded-2xl border border-line p-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-navy-3">
                      <Image src={q.color.image} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{q.cat.name} · {q.pack.name}</p>
                      <p className="text-sm text-muted">
                        {q.color.label} · {q.size.label} · {q.mat.label}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-line">
                          <button type="button" className="min-h-9 min-w-9" aria-label="Decrease quantity" onClick={() => setQty(item.id, item.qty - 1)}>−</button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <button type="button" className="min-h-9 min-w-9" aria-label="Increase quantity" onClick={() => setQty(item.id, item.qty + 1)}>+</button>
                        </div>
                        <button type="button" className="text-xs text-muted hover:text-paper" onClick={() => remove(item.id)}>Remove</button>
                      </div>
                    </div>
                    <p className="text-sm">{formatMoney(item.unitPrice * item.qty)}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-line px-5 py-5">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-muted">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatMoney(shipping)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className={`mt-4 flex min-h-12 items-center justify-center rounded-full bg-blue text-sm font-medium text-white hover:bg-blue-bright ${items.length === 0 ? "pointer-events-none opacity-40" : ""}`}
          >
            Preorder · {formatMoney(subtotal + shipping)}
          </Link>
        </div>
      </aside>
    </div>
  );
}
