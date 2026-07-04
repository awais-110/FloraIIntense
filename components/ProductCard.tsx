"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Repeat2 } from "@/components/Icons";
import { CartBrandIcon } from "@/components/BrandIcons";
import type { Product } from "@/lib/products";
import { useShop } from "@/components/ShopProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, openPreview } = useShop();

  return (
    <article className="product-card">
      <button
        className="product-image product-image-click"
        type="button"
        aria-label={`Quick view ${product.name}`}
        onClick={() => openPreview(product)}
      >
        {product.discount && <span className="discount">{product.discount}</span>}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 700px) 50vw, 360px"
        />
        <span className="image-hover-label">Quick View</span>
      </button>

      <div className="quick-actions">
        <button aria-label="Add to wishlist">
          <Heart color="#D7B46A" size={21} strokeWidth={2.4} />
        </button>

        <button aria-label="Preview product" onClick={() => openPreview(product)}>
          <Eye color="#D7B46A" size={21} strokeWidth={2.4} />
        </button>

        <button aria-label="Compare product">
          <Repeat2 color="#D7B46A" size={21} strokeWidth={2.4} />
        </button>
      </div>

      <div className="product-copy">
        <span>{product.collection}</span>

        <Link href={`/product/${product.id}`} className="product-title-link">
          <h3>{product.name} {product.size}</h3>
        </Link>

        <p>{product.description}</p>

        <div className="price-row">
          {product.oldPrice && <del>{product.oldPrice}</del>}
          <strong>{product.price}</strong>
        </div>

        <div className="product-card-actions">
          <button className="cart-link-button" onClick={() => addToCart(product)}>
            <CartBrandIcon size={24} />
            Add to cart
          </button>

          <Link className="details-link" href={`/product/${product.id}`}>
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
