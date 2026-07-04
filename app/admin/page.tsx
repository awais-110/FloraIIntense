import { products } from "@/lib/products";

export default function AdminPage() {
  return (
    <main className="admin-page">
      <span>Admin Preview</span>
      <h1>Floral Intense Products</h1>
      <p>Supabase schema is included. Use Supabase Table Editor for client-friendly product updates.</p>
      <div>
        {products.map((p) => (
          <article key={p.id}>
            <strong>{p.name}</strong>
            <small>{p.category}</small>
            <span>{p.price}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
