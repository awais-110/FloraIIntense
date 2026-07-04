"use client";

import { Heart, Home, Menu, ShoppingBag, User } from "@/components/Icons";
import { whatsappUrl } from "@/lib/utils";
import { useShop } from "@/components/ShopProvider";

const nav = [
  { label: "Home", href: "#", icon: Home },
  { label: "Menu", href: "#collections", icon: Menu },
  { label: "Shop", href: "#collections", icon: ShoppingBag },
  { label: "Wishlist", href: "#trending", icon: Heart },
  { label: "Account", href: whatsappUrl("Hi! I want to contact Floral Intense."), icon: User },
];

export default function BottomNav() {
  const { count, openCart } = useShop();

  return (
    <nav className="bottom-nav" aria-label="Mobile bottom navigation">
      {nav.map((item) => {
        const Icon = item.icon;
        const isShop = item.label === "Shop";

        if (isShop) {
          return (
            <button key={item.label} onClick={openCart} aria-label="Open cart">
              <span className="nav-icon-wrap">
                <Icon color="#F8EFE2" size={25} strokeWidth={2.35} />
                <b>{count}</b>
              </span>
              <small>Cart</small>
            </button>
          );
        }

        return (
          <a href={item.href} key={item.label}>
            <span className="nav-icon-wrap">
              <Icon color="#F8EFE2" size={25} strokeWidth={2.35} />
              {item.label === "Wishlist" && <b>0</b>}
            </span>
            <small>{item.label}</small>
          </a>
        );
      })}
    </nav>
  );
}
