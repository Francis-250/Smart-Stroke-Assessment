import { AdminPageHeader } from "@/components/admin-page-header";
import { AdminSettingsClient } from "@/components/admin-operations-client";
import { requireAdminPage } from "@/lib/admin-auth";
import prisma from "@/lib/prisma";

export default async function AdminSettingsPage() {
  await requireAdminPage();
  const settings = await prisma.systemSetting.findMany({ orderBy: { key: "asc" } });
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10"><AdminPageHeader eyebrow="Configuration" title="System settings" description="Manage key-value configuration used by the platform." /><AdminSettingsClient settings={settings.map((item) => ({ key: item.key, value: item.value, description: item.description ?? "" }))} /></div>;
}
