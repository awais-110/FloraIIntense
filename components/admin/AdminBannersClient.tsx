"use client";

import { useMemo, useState } from "react";

type BannerRow = {
  id?: string;
  title: string;
  subtitle?: string;
  image_url: string;
  button_text?: string;
  button_link?: string;
  is_active: boolean;
  sort_order: number;
};

const emptyBanner: BannerRow = {
  title: "",
  subtitle: "",
  image_url: "",
  button_text: "Order Now",
  button_link: "#collections",
  is_active: true,
  sort_order: 0,
};

export default function AdminBannersClient({ initialBanners }: { initialBanners: BannerRow[] }) {
  const [banners, setBanners] = useState<BannerRow[]>(initialBanners);
  const [editing, setEditing] = useState<BannerRow>(emptyBanner);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const sortedBanners = useMemo(
    () => [...banners].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    [banners]
  );

  async function uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("bucket", "banner-images");

    setUploading(true);
    setMessage("Uploading banner...");

    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Upload failed" }));
      setMessage(error.error || "Upload failed.");
      return;
    }

    const data = await response.json();
    setEditing((current) => ({ ...current, image_url: data.url }));
    setMessage("Banner uploaded.");
  }

  async function saveBanner(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch(editing.id ? `/api/admin/banners/${editing.id}` : "/api/admin/banners", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Save failed" }));
      setMessage(error.error || "Save failed.");
      return;
    }

    const saved = await response.json();
    if (editing.id) {
      setBanners((current) => current.map((item) => item.id === saved.id ? saved : item));
      setMessage("Banner updated.");
    } else {
      setBanners((current) => [saved, ...current]);
      setMessage("Banner added.");
    }
    setEditing(emptyBanner);
  }

  async function deleteBanner(id?: string) {
    if (!id) return;
    if (!confirm("Delete this banner?")) return;

    const response = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Delete failed.");
      return;
    }

    setBanners((current) => current.filter((item) => item.id !== id));
    setMessage("Banner deleted.");
  }

  return (
    <div className="admin-two-column">
      <section className="admin-card">
        <div className="admin-card-head"><span>{editing.id ? "Edit banner" : "Add banner"}</span><h1>Hero Banner</h1></div>

        <form className="admin-form" onSubmit={saveBanner}>
          <label>Title<input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></label>
          <label>Subtitle<textarea value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} /></label>
          <label>Image URL<input value={editing.image_url} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} required /></label>
          <label>Upload banner image<input type="file" accept="image/*" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage(file); }} /></label>
          {editing.image_url && <img className="admin-banner-preview" src={editing.image_url} alt="Banner preview" />}

          <div className="admin-form-grid">
            <label>Button text<input value={editing.button_text || ""} onChange={(e) => setEditing({ ...editing, button_text: e.target.value })} /></label>
            <label>Button link<input value={editing.button_link || ""} onChange={(e) => setEditing({ ...editing, button_link: e.target.value })} /></label>
          </div>

          <label>Sort order<input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
          <label className="admin-checkbox"><input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active / show in hero slider</label>

          <div className="admin-actions">
            <button type="submit">{editing.id ? "Update Banner" : "Add Banner"}</button>
            <button type="button" onClick={() => setEditing(emptyBanner)}>Clear</button>
          </div>
          {message && <small className="admin-message">{message}</small>}
        </form>
      </section>

      <section className="admin-card">
        <div className="admin-card-head"><span>Banners</span><h1>Hero Slider Images</h1></div>
        <div className="admin-list">
          {sortedBanners.map((banner) => (
            <article key={banner.id}>
              {banner.image_url && <img src={banner.image_url} alt={banner.title} />}
              <div><strong>{banner.title}</strong><span>{banner.is_active ? "Active" : "Hidden"} • Sort {banner.sort_order}</span><small>{banner.subtitle}</small></div>
              <button onClick={() => setEditing(banner)}>Edit</button>
              <button onClick={() => deleteBanner(banner.id)}>Delete</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
