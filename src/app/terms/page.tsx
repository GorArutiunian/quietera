import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl">Terms</h1>
      <p className="mt-4 text-muted">QuietEra earplugs are hearing protection for sleep and focus, not a medical device. 30-night guarantee applies to unused or gently used pairs returned with the case. Prices include the travel case. Limited colors can sell out.</p>
      <Link href="/" className="mt-8 inline-block text-ice-2 hover:text-paper">← Back to QuietEra</Link>
    </article>
  );
}
