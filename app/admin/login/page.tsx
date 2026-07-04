"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Checking...");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setStatus("Wrong password.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="admin-login-page">
      <form onSubmit={login} className="admin-login-card">
        <span>Floral Intense Admin</span>
        <h1>Admin Login</h1>
        <p>Enter your admin password to manage products, banners, images, prices and stock.</p>

        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>
        {status && <small>{status}</small>}
      </form>
    </div>
  );
}
