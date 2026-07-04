import ReviewForm from "@/components/ReviewForm";
import { Star } from "@/components/Icons";
import { reviews } from "@/lib/products";

export default function Reviews() {
  return (
    <section id="reviews" className="reviews">
      <div className="section-title">
        <h2>Customer favourite, loved by many!</h2>
        <p>Realistic trust section for your client’s brand showcase.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <article key={review.name}>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} color="#D7B46A" fill="#D7B46A" size={16} />
              ))}
            </div>
            <p>“{review.text}”</p>
            <strong>{review.name}</strong>
            <span>{review.location}</span>
          </article>
        ))}
      </div>
          <ReviewForm />
    </section>
  );
}
