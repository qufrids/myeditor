import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Settings } from "lucide-react";

const GROUPS = [
  { key: "general", label: "General", description: "Site name, tagline, and basic information" },
  { key: "contact", label: "Contact", description: "Email, phone, and address information" },
  { key: "seo", label: "SEO", description: "Meta titles, descriptions, and social settings" },
] as const;

const DEFAULT_SETTINGS = [
  { key: "site_name", value: "cambridgewriters", type: "text", group: "general" },
  { key: "site_tagline", value: "Expert Academic Writing Services", type: "text", group: "general" },
  { key: "contact_email", value: "info@cambridgewriters.co.uk", type: "text", group: "contact" },
  { key: "contact_phone", value: "+44 7877 186551", type: "text", group: "contact" },
  { key: "contact_address", value: "London, United Kingdom", type: "text", group: "contact" },
  { key: "meta_title", value: "cambridgewriters — Expert Academic Writing Services", type: "text", group: "seo" },
  { key: "meta_description", value: "Professional academic writing, editing and dissertation services for UK students.", type: "text", group: "seo" },
];

async function saveSettings(formData: FormData) {
  "use server";
  const updates: { key: string; value: string }[] = [];
  formData.forEach((value, key) => {
    if (key.startsWith("setting_")) {
      updates.push({ key: key.replace("setting_", ""), value: value as string });
    }
  });
  await Promise.all(
    updates.map(({ key, value }) =>
      prisma.siteSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value, type: "text", group: "general" },
      })
    )
  );
  revalidatePath("/admin/settings");
}

async function seedSettings() {
  "use server";
  await Promise.all(
    DEFAULT_SETTINGS.map((s) =>
      prisma.siteSettings.upsert({
        where: { key: s.key },
        update: {},
        create: s,
      })
    )
  );
  revalidatePath("/admin/settings");
}

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findMany({ orderBy: [{ group: "asc" }, { key: "asc" }] });
  const grouped = GROUPS.map((group) => ({
    ...group,
    settings: settings.filter((s) => s.group === group.key),
  }));
  const hasSettings = settings.length > 0;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em] text-slate-900 dark:text-white">Settings</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Manage site configuration</p>
        </div>
        {!hasSettings && (
          <form action={seedSettings}>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-700"
            >
              Seed Default Settings
            </button>
          </form>
        )}
      </div>

      {!hasSettings ? (
        <div className="rounded-2xl border border-slate-200/60 bg-white p-10 text-center dark:border-white/[0.04] dark:bg-white/[0.02]">
          <Settings className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-700" />
          <p className="mt-3 text-[13px] text-slate-500 dark:text-slate-400">
            No settings found. Click &quot;Seed Default Settings&quot; above to get started.
          </p>
        </div>
      ) : (
        <form action={saveSettings} className="space-y-6">
          {grouped.map((group) =>
            group.settings.length === 0 ? null : (
              <div
                key={group.key}
                className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-white/[0.04] dark:bg-white/[0.02]"
              >
                <div className="mb-5 border-b border-slate-100 pb-4 dark:border-white/[0.04]">
                  <h2 className="text-[15px] font-semibold text-slate-900 dark:text-white">{group.label}</h2>
                  <p className="mt-0.5 text-[12px] text-slate-500">{group.description}</p>
                </div>
                <div className="space-y-4">
                  {group.settings.map((setting) => (
                    <div key={setting.id} className="grid grid-cols-1 gap-1.5 sm:grid-cols-[220px_1fr] sm:items-center">
                      <label
                        htmlFor={`setting_${setting.key}`}
                        className="text-[13px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        {setting.key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </label>
                      {setting.type === "boolean" ? (
                        <select
                          id={`setting_${setting.key}`}
                          name={`setting_${setting.key}`}
                          defaultValue={setting.value}
                          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-slate-900 transition-colors focus:border-blue-500 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      ) : (
                        <input
                          id={`setting_${setting.key}`}
                          name={`setting_${setting.key}`}
                          type={setting.type === "number" ? "number" : "text"}
                          defaultValue={setting.value}
                          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-[13px] text-slate-900 transition-colors focus:border-blue-500 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
