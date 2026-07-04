import { Award, Clock3, Gem, ShieldCheck } from "@/components/Icons";

const items = [
  { icon: ShieldCheck, color: "#CBA45D", title: "Premium Ingredients", text: "Carefully selected perfume profiles for a refined experience." },
  { icon: Clock3, color: "#D7B46A", title: "Long Lasting", text: "Built for confident projection and memorable dry-down." },
  { icon: Gem, color: "#CBA45D", title: "Elegant & Luxury", text: "Dark brown, beige and gold identity made to feel premium." },
  { icon: Award, color: "#D7B46A", title: "Perfect For Every Occasion", text: "Daily wear, events, gifts and signature scent discovery." },
];

export default function BrandStory() {
  return (
    <section className="brand-story">
      <div className="section-title">
        <h2>Floral Intense Standard</h2>
        <p>Luxury scents by Floral Intense — Karachi based perfumery.</p>
      </div>
      <div className="story-grid">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon color={item.color} size={34} strokeWidth={2.4} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
