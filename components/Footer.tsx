import Image from "next/image";
import { Instagram, MessageCircle } from "@/components/Icons";
import { whatsappUrl } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="footer">
      <Image src="/floral-intense-logo.png" alt="Floral Intense logo" width={96} height={96} />
      <h2>Floral Intense</h2>
      <p>Luxury scents by Floral Intense. Karachi based perfumery with 14 fragrance products.</p>
      <div>
        <a href={whatsappUrl("Hi! I want to order from Floral Intense.")} target="_blank" rel="noreferrer">
          <MessageCircle color="#D7B46A" size={22} />
        </a>
        <a href="#" aria-label="Instagram">
          <Instagram color="#D7B46A" size={22} />
        </a>
      </div>
      <span>© 2026 Floral Intense. All rights reserved.</span>
    </footer>
  );
}
