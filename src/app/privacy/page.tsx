import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-4xl">Privacy</h1>
      <p className="mt-4 text-muted">We collect only what we need to ship your order: name, email, and address. We do not sell your data. Payment details are processed encrypted and not stored on QuietEra servers.</p>
      <Link href="/" className="mt-8 inline-block text-ice-2 hover:text-paper">← Back to QuietEra</Link>
    </article>
  );
}
