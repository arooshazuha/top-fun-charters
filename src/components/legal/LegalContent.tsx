import type { LegalDoc } from "@/data/legal";
import { Reveal } from "@/components/motion/Reveal";

export function LegalContent({ doc }: { doc: LegalDoc }) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-muted">Last updated: {doc.updated}</p>
      <p className="mt-5 text-lg leading-relaxed text-ink/80">{doc.intro}</p>

      <div className="mt-12 space-y-12">
        {doc.sections.map((s) => (
          <Reveal key={s.heading}>
            <section>
              <h2 className="font-display text-2xl text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mt-14 rounded-xl border border-line bg-sand-100 p-5 text-sm text-muted">
        Questions about this policy? Contact us at{" "}
        <a href="mailto:support@topfuncharters.com" className="font-medium text-brass-600 hover:underline">
          support@topfuncharters.com
        </a>
        .
      </p>
    </div>
  );
}
