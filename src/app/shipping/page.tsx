import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl">Shipping</h1>
      <p className="mt-4 text-muted">Free US shipping on orders over $50. Typical delivery 2–5 business days. International 6–12 days. Packed in unmarked boxes.</p>
      <Link href="/" className="mt-8 inline-block text-ice-2 hover:text-paper">← Back to QuietEra</Link>
    </article>
  );
}
