"use client";

import { useEffect, useState } from "react";
import type { FeedbackEntry } from "@/lib/feedback";
import { NEED_OPTIONS, NIGHT_OPTIONS, PROBLEM_OPTIONS } from "@/lib/feedback";

function labelOf(list: { id: string; label: string }[], id: string) {
  return list.find((x) => x.id === id)?.label ?? id;
}

export default function InboxPage() {
  const [rows, setRows] = useState<FeedbackEntry[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((d: { entries?: FeedbackEntry[] }) => setRows(d.entries ?? []))
      .catch(() => setError("Could not load feedback."));
  }, []);

  const counts = { yes: 0, maybe: 0, no: 0 };
  rows?.forEach((r) => {
    counts[r.need] += 1;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-4xl">Feedback inbox</h1>
      <p className="mt-2 text-sm text-muted">
        Who actually needs QuietEra, and what they told us.
      </p>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}
      {rows === null && <p className="mt-6 text-sm text-muted">Loading…</p>}

      {rows && (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-line p-4">
              <p className="text-xs uppercase tracking-wider text-muted">Need it</p>
              <p className="font-serif text-3xl">{counts.yes}</p>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <p className="text-xs uppercase tracking-wider text-muted">Maybe</p>
              <p className="font-serif text-3xl">{counts.maybe}</p>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <p className="text-xs uppercase tracking-wider text-muted">Just looking</p>
              <p className="font-serif text-3xl">{counts.no}</p>
            </div>
          </div>

          {rows.length === 0 ? (
            <p className="mt-8 text-sm text-muted">No replies yet.</p>
          ) : (
            <ul className="mt-8 space-y-4">
              {rows.map((r) => (
                <li key={r.id} className="rounded-3xl border border-line bg-navy-2 p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium">
                      {r.name} · <span className="text-muted">{r.email}</span>
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="mt-2 text-sm">
                    {labelOf(NEED_OPTIONS, r.need)} · {labelOf(PROBLEM_OPTIONS, r.problem)} ·{" "}
                    {labelOf(NIGHT_OPTIONS, r.nights)}
                  </p>
                  {r.message && <p className="mt-3 text-sm text-muted">{r.message}</p>}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
