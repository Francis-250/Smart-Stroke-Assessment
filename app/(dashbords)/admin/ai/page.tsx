import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminDatasetsClient } from "@/components/admin-operations-client";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin-auth";
import { formatAdminDate, formatAdminDateTime } from "@/lib/admin";
import prisma from "@/lib/prisma";

export default async function AdminAiPage() {
  await requireAdminPage();
  const [usage, datasets, total, failures, tokens] = await Promise.all([
    prisma.aiUsageLog.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { user: { select: { name: true } } } }),
    prisma.aiDataset.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.aiUsageLog.count(),
    prisma.aiUsageLog.count({ where: { status: { not: "SUCCESS" } } }),
    prisma.aiUsageLog.aggregate({ _sum: { totalTokens: true } }),
  ]);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <AdminPageHeader eyebrow="Models and data" title="AI operations" description="Monitor model calls, failures, latency, and active datasets." />
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-lg border p-4"><p className="text-2xl font-semibold">{total}</p><p className="text-xs text-muted-foreground mt-1">Total calls</p></div>
        <div className="rounded-lg border p-4"><p className="text-2xl font-semibold">{failures}</p><p className="text-xs text-muted-foreground mt-1">Failed calls</p></div>
        <div className="rounded-lg border p-4"><p className="text-2xl font-semibold">{(tokens._sum.totalTokens ?? 0).toLocaleString()}</p><p className="text-xs text-muted-foreground mt-1">Tokens used</p></div>
      </div>
      <div className="space-y-6">
        <div><p className="mb-3 text-sm font-medium">Datasets</p><AdminDatasetsClient datasets={datasets.map((item) => ({ id: item.id, name: item.name, fileName: item.fileName, records: item.recordCount, active: item.isActive, createdAt: formatAdminDate(item.createdAt) }))} /></div>
        <div><p className="mb-3 text-sm font-medium">Recent model calls</p><div className="rounded-lg border divide-y">{usage.map((item) => <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 px-4 py-4 items-center"><div className="md:col-span-3"><p className="text-sm font-medium">{item.model.replaceAll("_", " ")}</p><p className="text-xs text-muted-foreground">{item.callType.replaceAll("_", " ")}</p></div><div className="md:col-span-2"><Badge variant={item.status === "SUCCESS" ? "secondary" : "destructive"}>{item.status}</Badge></div><p className="md:col-span-2 text-sm">{item.latencyMs} ms</p><p className="md:col-span-2 text-xs text-muted-foreground">{item.totalTokens.toLocaleString()} tokens</p><div className="md:col-span-3 md:text-right"><p className="text-xs text-muted-foreground">{formatAdminDateTime(item.createdAt)}</p><p className="text-xs text-muted-foreground">{item.user?.name ?? "System"}</p></div></div>)}{usage.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No AI usage recorded.</p>}</div></div>
      </div>
    </div>
  );
}
