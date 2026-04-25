import { getRecentStructuredLogs } from "@/lib/troptions/structuredLogger";

export default function LogsPage() {
  const logs = getRecentStructuredLogs(200);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        <section>
          <p className="text-[#C9A84C] text-xs font-mono uppercase tracking-widest mb-2">Admin - Phase 9</p>
          <h1 className="text-4xl font-bold">Structured Logs</h1>
        </section>

        <section className="space-y-2">
          {logs.map((entry) => (
            <pre key={`${entry.timestamp}-${entry.actionType}`} className="bg-slate-900 border border-slate-800 rounded p-3 text-xs overflow-x-auto">
              {JSON.stringify(entry, null, 2)}
            </pre>
          ))}
        </section>
      </div>
    </main>
  );
}
