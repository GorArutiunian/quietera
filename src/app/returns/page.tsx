import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Returns" };

export default function ReturnsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl">30-night returns</h1>
      <p className="mt-4 text-muted">Sleep with QuietEra for up to 30 nights. If nights are not quieter, send them back for a full refund. No restocking fee. We cover US return shipping.</p>
      <Link href="/" className="mt-8 inline-block text-ice-2 hover:text-paper">← Back to QuietEra</Link>
    </article>
  );
}
