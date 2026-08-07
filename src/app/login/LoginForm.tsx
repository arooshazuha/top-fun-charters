"use client";

import { useActionState } from "react";
import { LoaderCircle, Lock } from "lucide-react";

import { login } from "./actions";
import type { LoginState } from "./types";

const INITIAL: LoginState = { error: null };

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState(login, INITIAL);

  return (
    <form action={action} className="mt-8 space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Passcode
        </label>
        <div className="relative">
          <Lock
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            autoFocus
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "login-error" : undefined}
            placeholder="Enter your passcode"
            className="w-full rounded-lg border border-line bg-sand-100 py-2.5 pl-10 pr-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-teal focus:bg-white"
          />
        </div>
      </div>

      {state.error ? (
        <p
          id="login-error"
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-teal font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,141,139,0.55)] transition-colors hover:bg-aqua disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
