import { AdminPageHeader } from "@/components/admin-page-header";
import { Badge } from "@/components/ui/badge";
import { requireAdminPage } from "@/lib/admin-auth";
import { formatAdminDateTime } from "@/lib/admin";
import prisma from "@/lib/prisma";

export default async function AdminAssessmentsPage() {
  await requireAdminPage();
  const assessments = await prisma.assessment.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: { select: { name: true, email: true } }, _count: { select: { doctorComments: true } } } });
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10"><AdminPageHeader eyebrow="Clinical oversight" title="Assessments" description="Review system-wide assessment activity and status." /><div className="rounded-lg border overflow-hidden divide-y">{assessments.map((item) => <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center px-4 py-4"><div className="md:col-span-3"><p className="text-sm font-medium">{item.user.name}</p><p className="text-xs text-muted-foreground">{item.user.email}</p></div><p className="md:col-span-2 text-xs text-muted-foreground">{formatAdminDateTime(item.createdAt)}</p><div className="md:col-span-2"><Badge variant={item.riskLevel === "HIGH" ? "destructive" : "outline"}>{item.riskLevel}</Badge></div><p className="md:col-span-2 text-sm">{Math.round(item.confidenceScore * 100)}% confidence</p><p className="md:col-span-1 text-xs text-muted-foreground">{item._count.doctorComments} notes</p><div className="md:col-span-2 md:text-right"><Badge variant={item.reviewedByDoctor ? "secondary" : "outline"}>{item.reviewedByDoctor ? "Reviewed" : "Unreviewed"}</Badge></div></div>)}{assessments.length === 0 && <p className="py-12 text-center text-sm text-muted-foreground">No assessments found.</p>}</div></div>;
}
