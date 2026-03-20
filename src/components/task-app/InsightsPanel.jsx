function InsightCard({ title, rows }) {
  return (
    <section className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
      <h3 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-slate-950">
        {title}
      </h3>
      <div className="mt-5 space-y-4 text-[15px]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-slate-600">{row.label}</span>
            <strong className="text-slate-950">{row.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function InsightsPanel({
  totalCount,
  doneCount,
  overdueCount,
  streakDays,
}) {
  return (
    <aside className="space-y-6">
      <InsightCard
        title="Analytics"
        rows={[
          { label: "Tasks", value: totalCount },
          { label: "Done", value: doneCount },
          { label: "Streak", value: `${streakDays} days` },
        ]}
      />

      <InsightCard
        title="Quick Links"
        rows={[{ label: "Overdue Tasks", value: overdueCount }]}
      />
    </aside>
  );
}
