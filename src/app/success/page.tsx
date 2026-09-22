"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { IconCheck } from "@/components/icons";

function SuccessInner() {
  const params = useSearchParams();
  const order = params.get("order") ?? "QE-000000";

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ok/15 text-ok">
        <IconCheck className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-serif text-4xl">You are on your way to quieter nights.</h1>
      <p className="mt-4 text-muted">
        Order <span className="text-paper">{order}</span> is confirmed. A receipt is on its way to your inbox.
        QuietEra typically ships within 24 hours.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-blue px-6 text-sm font-medium text-white hover:bg-blue-bright"
      >
        Back to QuietEra
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
