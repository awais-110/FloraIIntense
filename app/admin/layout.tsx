import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <span>Floral Intense</span>
          <strong>Admin Panel</strong>
        </div>

        <nav>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/banners">Banners</Link>
          <Link href="/">View Website</Link>
        </nav>

        <form action="/api/admin/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </aside>

      <section className="admin-content">{children}</section>
    </main>
  );
}
