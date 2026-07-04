const faqs = [
  {
    q: "What is Floral Intense?",
    a: "Floral Intense is a Karachi-based perfumery offering elegant, long-lasting fragrances for men, women and unisex scent lovers.",
  },
  {
    q: "How many products are available?",
    a: "Currently 14 products are included in the website structure, with Supabase support to add more later.",
  },
  {
    q: "How do customers order?",
    a: "Customers can click Add to cart or WhatsApp buttons and directly send the selected product name for confirmation.",
  },
  {
    q: "Is it mobile friendly?",
    a: "Yes, the layout is phone-first, includes bottom navigation, compact product cards and responsive sections.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="faq">
      <h2>FAQs</h2>
      <div>
        {faqs.map((faq, i) => (
          <details key={faq.q} open={i === 0}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
