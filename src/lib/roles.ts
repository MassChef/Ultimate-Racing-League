import { supabase } from "@/lib/supabase";

export const siteRoles = ["admin", "owner", "sponsor", "driver"] as const;

export type SiteRole = (typeof siteRoles)[number];

export const managementRoles: SiteRole[] = ["admin", "owner"];

export function formatRole(role: SiteRole) {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export async function getUserRole(userId: string): Promise<SiteRole | null> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  if (data?.role && siteRoles.includes(data.role as SiteRole)) {
    return data.role as SiteRole;
  }

  const { data: legacyAdmin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  return legacyAdmin ? "admin" : null;
}

export function canManageSite(role: SiteRole | null) {
  return Boolean(role && managementRoles.includes(role));
}
