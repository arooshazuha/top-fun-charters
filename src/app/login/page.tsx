import type { Metadata } from "next";
import { Anchor } from "lucide-react";

import { SITE } from "@/config/site";

import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  // Internal console — keep it out of search engines.
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const { next } = await searchParams;
  const nextPath = typeof next === "string" ? next : undefined;

  return (
    <main
      id="main"
      className="grid min-h-dvh place-items-center bg-ink px-5 py-16 text-sand"
    >
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-brass/15 text-brass">
            <Anchor className="size-6" />
          </span>
          <p className="eyebrow mt-4 text-brass-300">{SITE.name}</p>
          <h1 className="mt-1 font-display text-2xl text-sand">
            Operations Console
          </h1>
          <p className="mt-1 text-sm text-sand/60">
            Authorized staff only. Sign in to continue.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-sand p-6 shadow-[var(--shadow-float)]">
          <LoginForm next={nextPath} />
        </div>

        <p className="mt-6 text-center text-xs text-sand/40">
          Protected area · sessions expire automatically
        </p>
      </div>
    </main>
  );
}
