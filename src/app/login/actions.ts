"use server";

/**
 * Login / logout Server Actions. Server Actions run only on the server and
 * carry Next.js's built-in CSRF protection, which is why login lives here
 * rather than in a public API route.
 */
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { isAuthConfigured } from "@/env";
import { authenticate, createSession, destroySession } from "@/lib/auth";
import { rateLimit } from "@/lib/dashboard/rate-limit";

import type { LoginState } from "./types";

const LoginSchema = z.object({
  password: z.string().min(1, "Enter your passcode."),
  next: z.string().optional(),
});

/** Only allow same-app redirects into the dashboard (no open redirects). */
function safeNext(next: string | undefined): string {
  return next && next.startsWith("/dashboard") ? next : "/dashboard";
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAuthConfigured()) {
    return {
      error:
        "Login isn't configured. Set AUTH_SECRET and ADMIN_PASSWORD in the environment.",
    };
  }

  const parsed = LoginSchema.safeParse({
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // Blunt brute force: cap attempts per client IP.
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`login:${ip}`, 10).allowed) {
    return { error: "Too many attempts. Wait a minute and try again." };
  }

  const principal = authenticate(parsed.data.password);
  if (!principal) {
    return { error: "Incorrect passcode." };
  }

  await createSession(principal);
  redirect(safeNext(parsed.data.next));
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
