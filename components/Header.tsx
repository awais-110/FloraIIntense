"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "@/components/Icons";
import { CartBrandIcon } from "@/components/BrandIcons";
import { useShop } from "@/components/ShopProvider";

const links = [
  { href: "#collections", label: "Shop" },
  { href: "#women", label: "Women" },
  { href: "#men", label: "Men" },
  { href: "#testers", label: "Discovery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, openCart } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={scrolled ? "header scrolled" : "header"}>
        <button className="icon-button mobile-only" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu color="#F6E3C6" size={30} strokeWidth={2.4} />
        </button>

        <a className="logo-wrap" href="#" aria-label="Floral Intense home">
          <Image src="/floral-intense-logo.png" alt="Floral Intense logo" width={76} height={76} priority />
          <span>Floral Intense</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="icon-button" href="#collections" aria-label="Search products">
            <Search color="#D7B46A" size={24} strokeWidth={2.25} />
          </a>
          <button className="icon-button cart-dot" onClick={openCart} aria-label="Open cart">
            <CartBrandIcon size={28} />
            <span>{count}</span>
          </button>
        </div>
      </header>

      <div className={open ? "mobile-drawer open" : "mobile-drawer"}>
        <button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X color="#2B1B14" size={32} strokeWidth={2.5} />
        </button>
        <Image src="/floral-intense-logo.png" alt="Floral Intense logo" width={120} height={120} />
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
      </div>
    </>
  );
}
