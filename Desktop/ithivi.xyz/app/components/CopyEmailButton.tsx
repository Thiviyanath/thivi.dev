"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyState = "idle" | "copied" | "failed";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const copyEmail = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyState("failed");
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("failed");
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={copyEmail}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-200 transition-colors hover:border-accent/40 hover:text-accent"
      >
        {copyState === "copied" ? (
          <Check aria-hidden="true" className="size-4 text-accent" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        {copyState === "copied" ? "Email copied" : "Copy email address"}
      </button>
      <p aria-live="polite" className="min-h-5 text-sm text-zinc-500">
        {copyState === "failed" &&
          "Copy isn’t available here. Select the email address to copy it."}
      </p>
    </div>
  );
}
