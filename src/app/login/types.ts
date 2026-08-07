/** Shared login form state. Kept out of the "use server" actions file, which
 * may only export async functions. */
export type LoginState = { error: string | null };
