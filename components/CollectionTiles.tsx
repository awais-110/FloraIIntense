import Image from "next/image";

const tiles = [
  {
    href: "#women",
    title: "Women’s Collection",
    image: "https://images.pexels.com/photos/19086285/pexels-photo-19086285.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    href: "#men",
    title: "Uni-sex Collection",
    image: "https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

export default function CollectionTiles() {
  return (
    <section className="collection-tiles">
      <div className="section-title">
        <h2>Luxury Perfume Collection</h2>
        <p>One brand. Every fragrance.</p>
      </div>
      <div className="tile-grid">
        {tiles.map((tile) => (
          <a href={tile.href} className="collection-tile" key={tile.title}>
            <Image src={tile.image} alt={tile.title} fill sizes="(max-width: 800px) 50vw, 500px" />
            <div><span>{tile.title}</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}
