"use client";

import { useEffect, useMemo, useState } from "react";

type ProductRow = {
  id?: string;
  name: string;
  slug: string;
  category: string;
  collection?: string;
  badge?: string;
  size?: string;
  price: number;
  old_price?: number | null;
  stock: number;
  discount?: string;
  description?: string;
  notes?: string[] | string;
  image_url?: string;
  whatsapp_text?: string;
  featured?: boolean;
  is_active: boolean;
  sort_order: number;
};

const emptyProduct: ProductRow = {
  name: "",
  slug: "",
  category: "unisex",
  collection: "Signature",
  badge: "New",
  size: "30ml",
  price: 0,
  old_price: null,
  stock: 0,
  discount: "",
  description: "",
  notes: [],
  image_url: "",
  whatsapp_text: "",
  featured: false,
  is_active: true,
  sort_order: 0,
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminProductsClient({ initialProducts }: { initialProducts: ProductRow[] }) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [editing, setEditing] = useState<ProductRow>(emptyProduct);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
    [products]
  );

  useEffect(() => {
    if (!editing.id && editing.name) {
      setEditing((current) => ({ ...current, slug: makeSlug(current.name) }));
    }
  }, [editing.name, editing.id]);

  async function uploadImage(file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("bucket", "product-images");

    setUploading(true);
    setMessage("Uploading image...");

    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(false);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Image upload failed" }));
      setMessage(error.error || "Image upload failed.");
      return;
    }

    const data = await response.json();
    setEditing((current) => ({ ...current, image_url: data.url }));
    setMessage("Image uploaded.");
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const notes = Array.isArray(editing.notes)
      ? editing.notes
      : String(editing.notes || "").split(",").map((item) => item.trim()).filter(Boolean);

    const payload = {
      ...editing,
      slug: editing.slug || makeSlug(editing.name),
      notes,
      whatsapp_text: editing.whatsapp_text || `Hi! I want to order ${editing.name} by Floral Intense.`,
    };

    const response = await fetch(editing.id ? `/api/admin/products/${editing.id}` : "/api/admin/products", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Save failed" }));
      setMessage(error.error || "Save failed.");
      return;
    }

    const saved = await response.json();

    if (editing.id) {
      setProducts((current) => current.map((item) => item.id === saved.id ? saved : item));
      setMessage("Product updated.");
    } else {
      setProducts((current) => [saved, ...current]);
      setMessage("Product added.");
    }

    setEditing(emptyProduct);
  }

  async function deleteProduct(id?: string) {
    if (!id) return;
    if (!confirm("Delete this product?")) return;

    const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });

    if (!response.ok) {
      setMessage("Delete failed.");
      return;
    }

    setProducts((current) => current.filter((item) => item.id !== id));
    setMessage("Product deleted.");
  }

  return (
    <div className="admin-two-column">
      <section className="admin-card">
        <div className="admin-card-head">
          <span>{editing.id ? "Edit product" : "Add product"}</span>
          <h1>{editing.id ? editing.name : "New Product"}</h1>
        </div>

        <form className="admin-form" onSubmit={saveProduct}>
          <label>Product name<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></label>
          <label>Slug<input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: makeSlug(e.target.value) })} required /></label>

          <div className="admin-form-grid">
            <label>Category<select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
              <option value="women">Women</option><option value="men">Men</option><option value="unisex">Unisex</option><option value="tester">Tester</option><option value="gift">Gift</option>
            </select></label>
            <label>Collection<input value={editing.collection || ""} onChange={(e) => setEditing({ ...editing, collection: e.target.value })} /></label>
          </div>

          <div className="admin-form-grid">
            <label>Price<input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} required /></label>
            <label>Old price<input type="number" value={editing.old_price || ""} onChange={(e) => setEditing({ ...editing, old_price: e.target.value ? Number(e.target.value) : null })} /></label>
          </div>

          <div className="admin-form-grid">
            <label>Stock<input type="number" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} /></label>
            <label>Discount label<input placeholder="-20%" value={editing.discount || ""} onChange={(e) => setEditing({ ...editing, discount: e.target.value })} /></label>
          </div>

          <div className="admin-form-grid">
            <label>Size<input placeholder="30ml" value={editing.size || ""} onChange={(e) => setEditing({ ...editing, size: e.target.value })} /></label>
            <label>Sort order<input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></label>
          </div>

          <label>Badge<input placeholder="New / Bestseller" value={editing.badge || ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} /></label>
          <label>Notes, comma separated<input placeholder="Oud, Musk, Rose" value={Array.isArray(editing.notes) ? editing.notes.join(", ") : editing.notes || ""} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></label>
          <label>Description<textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></label>
          <label>Image URL<input value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} /></label>
          <label>Upload image<input type="file" accept="image/*" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage(file); }} /></label>
          {editing.image_url && <img className="admin-preview-image" src={editing.image_url} alt="Product preview" />}
          <label className="admin-checkbox"><input type="checkbox" checked={Boolean(editing.featured)} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured product</label>
          <label className="admin-checkbox"><input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active / show on website</label>

          <div className="admin-actions">
            <button type="submit">{editing.id ? "Update Product" : "Add Product"}</button>
            <button type="button" onClick={() => setEditing(emptyProduct)}>Clear</button>
          </div>
          {message && <small className="admin-message">{message}</small>}
        </form>
      </section>

      <section className="admin-card">
        <div className="admin-card-head"><span>Products</span><h1>Manage Items</h1></div>
        <div className="admin-list">
          {sortedProducts.map((product) => (
            <article key={product.id}>
              {product.image_url && <img src={product.image_url} alt={product.name} />}
              <div><strong>{product.name}</strong><span>{product.category} • PKR {product.price} • Stock {product.stock}</span><small>{product.is_active ? "Active" : "Hidden"}</small></div>
              <button onClick={() => setEditing(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
