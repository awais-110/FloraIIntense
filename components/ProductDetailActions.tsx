"use client";

import type { Product } from "@/lib/products";
import { CartBrandIcon, WhatsAppBrandIcon } from "@/components/BrandIcons";
import { useShop } from "@/components/ShopProvider";
import { whatsappUrl } from "@/lib/utils";

export default function ProductDetailActions({ product }: { product: Product }) {
  const { addToCart, openCart } = useShop();

  return (
    <div className="detail-actions">
      <button
        type="button"
        onClick={() => {
          addToCart(product);
          openCart();
        }}
      >
        <CartBrandIcon size={24} />
        Add to Cart
      </button>

      <a href={whatsappUrl(product.whatsappText)} target="_blank" rel="noreferrer">
        <WhatsAppBrandIcon size={24} />
        Order on WhatsApp
      </a>
    </div>
  );
}
