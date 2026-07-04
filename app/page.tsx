import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import CollectionTiles from "@/components/CollectionTiles";
import ProductSections from "@/components/ProductSections";
import BrandStory from "@/components/BrandStory";
import Reviews from "@/components/Reviews";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import WhatsAppFab from "@/components/WhatsAppFab";
import { ShopProvider } from "@/components/ShopProvider";
import { getHeroSlides, getProducts } from "@/lib/supabase";

export default async function Home() {
  const [products, heroSlides] = await Promise.all([getProducts(), getHeroSlides()]);

  return (
    <ShopProvider>
      <Header />
      <main>
        <Hero slides={heroSlides} />
        <Countdown />
        <CollectionTiles />
        <BrandStory />
        <ProductSections products={products} />
        <Reviews />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppFab />
      <BottomNav />
    </ShopProvider>
  );
}
