"use client";
import { useEffect, useState } from "react";
import AdminSettings from "@/components/admin/AdminSettings";
import { apiFetch } from "@/lib/api";
import { DEFAULT_SETTINGS } from "@/lib/data";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    apiFetch("/api/settings")
      .then((r) => (r.ok ? r.json() : DEFAULT_SETTINGS))
      .then((s) => setSettings({ ...DEFAULT_SETTINGS, ...(s || {}) }))
      .catch(() => setSettings(DEFAULT_SETTINGS));
  }, []);
  if (!settings) return null;
  return <AdminSettings initial={settings} />;
}
