import type { Metadata } from "next";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata: Metadata = { title: "Feedback" };

export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="text-xs uppercase tracking-[0.24em] text-ice-2">Research</p>
      <h1 className="mt-3 font-serif text-4xl">Do you need QuietEra?</h1>
      <p className="mt-3 text-muted">
        Tell us if this solves a real night for you. Feedback shapes the next run — models, colors, and fit.
      </p>
      <div className="mt-10">
        <FeedbackForm />
      </div>
    </div>
  );
}
