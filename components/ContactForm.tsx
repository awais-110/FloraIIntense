"use client";

import { useState } from "react";
import { WhatsAppBrandIcon } from "@/components/BrandIcons";
import { whatsappUrl } from "@/lib/utils";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const phone = String(form.get("phone") || "");
    const message = String(form.get("message") || "");

    const text = `Hi Floral Intense! Contact form message:\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-title">
        <h2>Contact & Custom Order</h2>
        <p>Ask for recommendation, delivery details or gift set suggestions.</p>
      </div>

      <div className="contact-card">
        <div>
          <span>Direct WhatsApp Support</span>
          <h3>Need help choosing a scent?</h3>
          <p>
            Customers can send their details and message directly to WhatsApp.
            This works without backend. Later it can also be saved in Supabase.
          </p>
        </div>

        <form onSubmit={submit}>
          <input name="name" placeholder="Your name" required />
          <input name="phone" placeholder="Phone / WhatsApp number" required />
          <textarea name="message" placeholder="What are you looking for?" required />
          <button type="submit">
            <WhatsAppBrandIcon size={24} />
            Send Message
          </button>
          {sent && <small>WhatsApp opened with your message.</small>}
        </form>
      </div>
    </section>
  );
}
