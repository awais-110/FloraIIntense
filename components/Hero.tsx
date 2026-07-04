import Image from "next/image";
import { Award, Clock3, Gem, Gift } from "@/components/Icons";
import { WhatsAppBrandIcon } from "@/components/BrandIcons";
import { whatsappUrl } from "@/lib/utils";

const features = [
  { icon: Award, text: "Exquisite Fragrance", color: "#CBA45D" },
  { icon: Clock3, text: "Long Lasting", color: "#D7B46A" },
  { icon: Gem, text: "Premium Quality", color: "#CBA45D" },
  { icon: Gift, text: "Made For Moments", color: "#D7B46A" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Luxury perfume hero"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="kicker">Luxury Scents by Floral Intense</span>

        <h1>Elegance Redefined. Luxury Unleashed.</h1>

        <p>
          A fragrance that speaks before you do. Premium perfume collection for
          every occasion.
        </p>

        <a
          className="gold-button"
          href={whatsappUrl("Hi! I want to order from Floral Intense.")}
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppBrandIcon size={22} />
          Order on WhatsApp
        </a>
      </div>

      <div className="hero-feature-bar">
        {features.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.text}>
              <Icon color={item.color} size={28} strokeWidth={2.2} />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
