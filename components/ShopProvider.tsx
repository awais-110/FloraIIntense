"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";
import { whatsappUrl } from "@/lib/utils";
import { CartBrandIcon, WhatsAppBrandIcon } from "@/components/BrandIcons";
import { X } from "@/components/Icons";

type CartItem = {
  product: Product;
  quantity: number;
};

type ShopContextValue = {
  items: CartItem[];
  count: number;
  subtotalText: string;
  addToCart: (product: Product) => void;
  openCart: () => void;
  openPreview: (product: Product) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function priceNumber(price: string) {
  const match = price.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [preview, setPreview] = useState<Product | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("floral-intense-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems([]);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem("floral-intense-cart", JSON.stringify(items));
    }
  }, [items, loaded]);

  const addToCart = useCallback((product: Product) => {
    setItems((current) => {
      const exists = current.find((item) => item.product.id === product.id);
      if (exists) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => item.product.id === id ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.product.id !== id));
  }, []);

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + priceNumber(item.product.price) * item.quantity, 0),
    [items]
  );

  const subtotalText = subtotal ? `PKR ${subtotal.toLocaleString()}` : "PKR 0";

  const checkoutMessage = useMemo(() => {
    if (!items.length) return "Hi Floral Intense! I want to place an order.";
    const lines = items.map(
      (item) => `${item.quantity} x ${item.product.name} ${item.product.size} — ${item.product.price}`
    );
    return `Hi Floral Intense! I want to order:\n${lines.join("\n")}\nSubtotal: ${subtotalText}`;
  }, [items, subtotalText]);

  const value: ShopContextValue = {
    items,
    count,
    subtotalText,
    addToCart,
    openCart: () => setCartOpen(true),
    openPreview: setPreview,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}

      {preview && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="preview-modal">
            <button className="modal-close-button" onClick={() => setPreview(null)} aria-label="Close preview">
              <X color="#F8EFE2" size={24} />
            </button>

            <div className="preview-image">
              <Image src={preview.image} alt={preview.name} fill sizes="(max-width: 700px) 92vw, 480px" />
            </div>

            <div className="preview-copy">
              <span>{preview.collection}</span>
              <h2>{preview.name}</h2>
              <p>{preview.description}</p>

              <div className="preview-notes">
                {preview.notes.map((note) => <small key={note}>{note}</small>)}
              </div>

              <div className="preview-price">
                {preview.oldPrice && <del>{preview.oldPrice}</del>}
                <strong>{preview.price}</strong>
                <em>{preview.size}</em>
              </div>

              <div className="preview-actions">
                <button onClick={() => addToCart(preview)}>
                  <CartBrandIcon size={23} />
                  Add to Cart
                </button>

                <Link href={`/product/${preview.id}`} onClick={() => setPreview(null)}>
                  View Details
                </Link>

                <a href={whatsappUrl(preview.whatsappText)} target="_blank" rel="noreferrer">
                  <WhatsAppBrandIcon size={24} />
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside className={cartOpen ? "cart-drawer open" : "cart-drawer"} aria-label="Shopping cart">
        <div className="cart-head">
          <div>
            <span>Your Cart</span>
            <strong>{count} item{count === 1 ? "" : "s"}</strong>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X color="#F8EFE2" size={24} />
          </button>
        </div>

        <div className="cart-body">
          {!items.length ? (
            <div className="empty-cart">
              <CartBrandIcon size={46} />
              <p>Your cart is empty. Add a fragrance to continue.</p>
            </div>
          ) : (
            items.map((item) => (
              <article className="cart-item" key={item.product.id}>
                <div className="cart-item-img">
                  <Image src={item.product.image} alt={item.product.name} fill sizes="90px" />
                </div>

                <div className="cart-item-copy">
                  <strong>{item.product.name}</strong>
                  <span>{item.product.price} / {item.product.size}</span>
                  <div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <b>{item.quantity}</b>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                    <button onClick={() => removeItem(item.product.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div>
            <span>Subtotal</span>
            <strong>{subtotalText}</strong>
          </div>
          <a href={whatsappUrl(checkoutMessage)} target="_blank" rel="noreferrer">
            <WhatsAppBrandIcon size={24} />
            Checkout on WhatsApp
          </a>
        </div>
      </aside>

      {cartOpen && <button className="drawer-overlay" aria-label="Close cart" onClick={() => setCartOpen(false)} />}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
}
