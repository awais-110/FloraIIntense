import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductSections({ products }: { products: Product[] }) {
  const trending = products.slice(0, 4);
  const men = products.filter((p) => p.category === "men");
  const women = products.filter((p) => p.category === "women");
  const discovery = products
    .filter((p) => p.category === "tester" || p.category === "gift" || p.category === "unisex")
    .slice(0, 4);

  return (
    <section id="collections" className="products-area">
      <ProductGroup id="trending" title="Trending right now" products={trending} />
      <ProductGroup id="men" title="Men’s" products={men} />
      <ProductGroup id="women" title="Women’s" products={women} />
      <ProductGroup id="testers" title="Discovery & Gift Sets" products={discovery} />
    </section>
  );
}

function ProductGroup({ id, title, products }: { id: string; title: string; products: Product[] }) {
  return (
    <div id={id} className="product-group">
      <h2>{title}</h2>
      <div className="product-grid">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
