/**
 * Financial & tax view. Server component, OWNER-ONLY (the route guards this and
 * the DAL redirects captains away). Shows the multi-channel revenue breakdown
 * and the non-taxable (1–6 service) vs taxable (7–13 bareboat, 7%) split, plus
 * the "Download CSV for Taxes" action.
 */
import { ArrowDownToLine, Coins, Landmark, Receipt, Wallet } from "lucide-react";

import { formatDateLong, formatMoney, formatPercent } from "@/lib/dashboard/format";
import { channelLabel, type DashboardData, type TaxBucket } from "@/lib/dashboard/types";

import { Chip, Panel, SectionTitle, StatCard, StatusBanner } from "./ui";

function DlRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className={strong ? "font-semibold text-ink" : "text-ink"}>{value}</dd>
    </div>
  );
}

function TaxBucketCard({
  bucket,
  currency,
  taxable,
  rate,
}: {
  bucket: TaxBucket;
  currency: string;
  taxable: boolean;
  rate: number;
}) {
  return (
    <Panel>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-ink">{bucket.label}</h3>
        <Chip tone={taxable ? "gold" : "good"}>
          {taxable ? `Taxable · ${formatPercent(rate)}` : "Non-taxable"}
        </Chip>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <DlRow label="Charters" value={String(bucket.count)} />
        <DlRow label="Gross fees" value={formatMoney(bucket.gross, currency)} />
        <DlRow
          label="Sales tax due"
          value={formatMoney(bucket.taxDue, currency)}
          strong
        />
      </dl>
    </Panel>
  );
}

export function FinancialsView({ data }: { data: DashboardData }) {
  const fin = data.financials;
  if (!fin) return null;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl text-ink">Financials &amp; tax</h1>
          <p className="mt-1 text-sm text-muted">
            {fin.charterCount} charters · {formatDateLong(fin.periodStart)} –{" "}
            {formatDateLong(fin.periodEnd)}
          </p>
        </div>
        <a
          href="/api/dashboard/export"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-teal px-5 font-semibold text-white shadow-[0_8px_24px_-8px_rgba(0,141,139,0.55)] transition-colors hover:bg-aqua"
        >
          <ArrowDownToLine className="size-4" />
          Download CSV for Taxes
        </a>
      </header>

      {!data.configured ? (
        <StatusBanner title="GoHighLevel isn't connected yet">
          {data.message} Figures below will populate once live charter revenue is
          available.
        </StatusBanner>
      ) : null}
      {data.configured && data.degraded ? (
        <StatusBanner tone="warn" title="Live sync issue">
          {data.message}
        </StatusBanner>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Gross revenue"
          value={formatMoney(fin.grossRevenue, fin.currency)}
          sub="Pre-tax charter fees"
          icon={<Wallet className="size-4" />}
        />
        <StatCard
          label={`Sales tax due (${formatPercent(fin.taxRate)})`}
          value={formatMoney(fin.totalTaxDue, fin.currency)}
          tone="gold"
          sub="On 7–13 bareboat only"
          icon={<Receipt className="size-4" />}
        />
        <StatCard
          label="Total collected"
          value={formatMoney(fin.totalCollectedWithTax, fin.currency)}
          sub="Fees + tax"
          icon={<Coins className="size-4" />}
        />
        <StatCard
          label="Charters"
          value={fin.charterCount}
          sub="With recorded revenue"
          icon={<Landmark className="size-4" />}
        />
      </div>

      <section>
        <SectionTitle>Tax split</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <TaxBucketCard
            bucket={fin.nonTaxable}
            currency={fin.currency}
            taxable={false}
            rate={fin.taxRate}
          />
          <TaxBucketCard
            bucket={fin.taxable}
            currency={fin.currency}
            taxable
            rate={fin.taxRate}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          1–6 guest captained charters are treated as a non-taxable service;
          7–13 guest bareboat rentals are taxed at {formatPercent(fin.taxRate)}.
          Confirm the rate and classification with your accountant.
        </p>
      </section>

      <section>
        <SectionTitle>Revenue by channel</SectionTitle>
        <Panel className="overflow-hidden p-0">
          {fin.byChannel.length === 0 ? (
            <p className="p-4 text-sm text-muted">No revenue recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                    <th className="px-4 py-2.5 font-semibold">Channel</th>
                    <th className="px-4 py-2.5 font-semibold">Charters</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Gross</th>
                    <th className="px-4 py-2.5 text-right font-semibold">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {fin.byChannel.map((t) => (
                    <tr
                      key={t.channel}
                      className="border-b border-line/60 last:border-0"
                    >
                      <td className="px-4 py-2.5 text-ink">
                        {channelLabel(t.channel)}
                      </td>
                      <td className="px-4 py-2.5 text-muted">{t.count}</td>
                      <td className="px-4 py-2.5 text-right text-ink">
                        {formatMoney(t.gross, fin.currency)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-muted">
                        {fin.grossRevenue > 0
                          ? `${Math.round((t.gross / fin.grossRevenue) * 100)}%`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      </section>
    </div>
  );
}
