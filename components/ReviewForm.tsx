"use client";

import { useEffect, useState } from "react";
import { Star } from "@/components/Icons";

type SavedReview = {
  name: string;
  rating: string;
  text: string;
};

export default function ReviewForm() {
  const [sent, setSent] = useState(false);
  const [savedReviews, setSavedReviews] = useState<SavedReview[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem("floral-intense-reviews");
    if (saved) {
      try {
        setSavedReviews(JSON.parse(saved));
      } catch {
        setSavedReviews([]);
      }
    }
  }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const review = {
      name: String(form.get("name") || "Customer"),
      rating: String(form.get("rating") || "5"),
      text: String(form.get("review") || ""),
    };

    const next = [review, ...savedReviews].slice(0, 4);
    setSavedReviews(next);
    window.localStorage.setItem("floral-intense-reviews", JSON.stringify(next));
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="review-form-card">
      <div>
        <span>Share your experience</span>
        <h3>Leave a Review</h3>
        <p>
          Review form works on the frontend and stores submitted reviews in browser
          localStorage. For real admin approval, connect it to Supabase later.
        </p>

        {savedReviews.length > 0 && (
          <div className="saved-review-list">
            {savedReviews.map((review, index) => (
              <article key={`${review.name}-${index}`}>
                <strong>{review.name}</strong>
                <small>{"★".repeat(Number(review.rating))}</small>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={submit}>
        <input name="name" aria-label="Name" placeholder="Your name" required />
        <select name="rating" aria-label="Rating" defaultValue="5">
          <option value="5">★★★★★ 5 Stars</option>
          <option value="4">★★★★☆ 4 Stars</option>
          <option value="3">★★★☆☆ 3 Stars</option>
        </select>
        <textarea name="review" aria-label="Review" placeholder="Write your review..." required />
        <button type="submit">
          <Star color="#120D0A" fill="#120D0A" size={18} />
          Submit Review
        </button>
        {sent && <small className="review-sent">Review added successfully.</small>}
      </form>
    </div>
  );
}
