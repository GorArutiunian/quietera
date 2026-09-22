"use client";

import { FormEvent, useState } from "react";
import { NEED_OPTIONS, NIGHT_OPTIONS, PROBLEM_OPTIONS } from "@/lib/feedback";
import { IconCheck } from "@/components/icons";

const field =
  "mt-1.5 min-h-12 w-full rounded-2xl border border-line bg-navy-2 px-4 text-paper";

export function FeedbackForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setBusy(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          need: data.need,
          problem: data.problem,
          nights: data.nights,
          message: data.message,
          sharePublic: data.sharePublic === "on",
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(json.error || "Could not send. Try again.");
        return;
      }
      setDone(true);
      form.reset();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-line bg-navy-2 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ok/15 text-ok">
          <IconCheck className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-serif text-2xl">Thank you. We read every note.</h3>
        <p className="mt-2 text-sm text-muted">
          Your answers help us see who actually needs QuietEra — and what to fix.
        </p>
        <button
          type="button"
          className="mt-6 text-sm text-ice-2 hover:text-paper"
          onClick={() => setDone(false)}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-medium">Do you actually need QuietEra?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {NEED_OPTIONS.map((o) => (
            <label
              key={o.id}
              className="flex cursor-pointer flex-col rounded-2xl border border-line px-4 py-3 has-[:checked]:border-blue has-[:checked]:bg-blue/15"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <input type="radio" name="need" value={o.id} required className="accent-blue" defaultChecked={o.id === "yes"} />
                {o.label}
              </span>
              <span className="mt-1 text-xs text-muted">{o.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input required name="name" autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          Email
          <input required name="email" type="email" autoComplete="email" className={field} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          What is the noise?
          <select name="problem" className={field} defaultValue="snoring">
            {PROBLEM_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          How often do you lose sleep?
          <select name="nights" className={field} defaultValue="every">
            {NIGHT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        Feedback, questions, or what you wish existed
        <textarea
          name="message"
          rows={4}
          className="mt-1.5 w-full rounded-2xl border border-line bg-navy-2 px-4 py-3 text-paper"
          placeholder="Tell us what would make this worth it for you."
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="sharePublic" className="mt-1 accent-blue" />
        You may show my feedback on the site (first name only).
      </label>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-blue text-sm font-medium text-white hover:bg-blue-bright disabled:opacity-40 sm:w-auto sm:px-8"
      >
        {busy ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
