import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFab from "@/components/WhatsAppFab";
import { ShopProvider } from "@/components/ShopProvider";
import ProductDetailActions from "@/components/ProductDetailActions";
import { products } from "@/lib/products";
import { getProducts } from "@/lib/supabase";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const allProducts = await getProducts();
  const product = allProducts.find((item) => item.id === id);

  return {
    title: product ? `${product.name} — Floral Intense` : "Product — Floral Intense",
    description: product?.description || "Luxury perfume by Floral Intense.",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const allProducts = await getProducts();
  const product = allProducts.find((item) => item.id === id);

  if (!product) notFound();

  const relatedProducts = allProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  return (
    <ShopProvider>
      <Header />

      <main className="product-detail-page">
        <Link className="back-link" href="/#collections">← Back to collection</Link>

        <section className="product-detail-shell">
          <div className="detail-image">
            {product.discount && <span className="discount">{product.discount}</span>}
            <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 900px) 92vw, 560px" />
          </div>

          <div className="detail-copy">
            <span>{product.collection}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>

            <div className="detail-notes">
              {product.notes.map((note) => <small key={note}>{note}</small>)}
            </div>

            <div className="detail-price">
              {product.oldPrice && <del>{product.oldPrice}</del>}
              <strong>{product.price}</strong>
              <em>{product.size}</em>
            </div>

            <ProductDetailActions product={product} />

            <div className="detail-info-grid">
              <article><strong>Long Lasting</strong><p>Designed for strong presence and premium dry-down.</p></article>
              <article><strong>Gift Ready</strong><p>Clean presentation suitable for special occasions.</p></article>
              <article><strong>Easy Ordering</strong><p>Add to cart or order directly through WhatsApp.</p></article>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2>Related Scents</h2>
            <div>
              {relatedProducts.map((item) => (
                <Link href={`/product/${item.id}`} key={item.id}>
                  <Image src={item.image} alt={item.name} width={120} height={140} />
                  <span>{item.name}</span>
                  <strong>{item.price}</strong>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppFab />
      <BottomNav />
    </ShopProvider>
  );
}
