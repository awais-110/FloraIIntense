export type ProductCategory = "women" | "men" | "unisex" | "tester" | "gift";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  collection: string;
  badge: string;
  discount?: string;
  oldPrice?: string;
  price: string;
  size: string;
  description: string;
  notes: string[];
  image: string;
  whatsappText: string;
  featured?: boolean;
};

export const products: Product[] = [
  { id:"tuscan-leather", name:"Tuscan Leather", category:"unisex", collection:"Signature", badge:"Signature", discount:"-25%", oldPrice:"PKR 3,800", price:"PKR 2,800", size:"30ml", description:"Dark leather, oud and musk for a premium evening statement.", notes:["Leather","Oud","Musk"], image:"https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Tuscan Leather by Floral Intense.", featured:true },
  { id:"bloom-aura", name:"Bloom Aura", category:"women", collection:"Women", badge:"Bestseller", discount:"-20%", oldPrice:"PKR 3,100", price:"PKR 2,500", size:"30ml", description:"Soft rose and jasmine with a polished feminine aura.", notes:["Rose","Jasmine","White Musk"], image:"https://images.pexels.com/photos/19086285/pexels-photo-19086285.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Bloom Aura by Floral Intense." },
  { id:"charm-edp", name:"Charm EDP", category:"women", collection:"Women", badge:"New", discount:"-18%", oldPrice:"PKR 3,050", price:"PKR 2,500", size:"30ml", description:"Sweet oriental perfume with vanilla, amber and clean musk.", notes:["Vanilla","Amber","Musk"], image:"https://images.pexels.com/photos/30999189/pexels-photo-30999189.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Charm EDP by Floral Intense." },
  { id:"rose-elegance", name:"Rosé Elegance", category:"women", collection:"Women", badge:"Popular", discount:"-22%", oldPrice:"PKR 3,200", price:"PKR 2,500", size:"30ml", description:"Elegant rose profile for daily wear and special occasions.", notes:["Rose","Peony","Powder"], image:"https://images.pexels.com/photos/32816849/pexels-photo-32816849.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Rosé Elegance by Floral Intense." },
  { id:"velvet-rose", name:"Velvet Rose", category:"women", collection:"Women", badge:"Trending", discount:"-34%", oldPrice:"PKR 3,099", price:"PKR 2,050", size:"50ml", description:"Luxurious floral rose perfume with confident projection.", notes:["Rose","Lychee","Musk"], image:"https://images.pexels.com/photos/13736416/pexels-photo-13736416.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Velvet Rose by Floral Intense." },
  { id:"pink-orchid", name:"Pink Orchid", category:"women", collection:"Women", badge:"Luxury", discount:"-30%", oldPrice:"PKR 3,500", price:"PKR 2,450", size:"50ml", description:"Pink floral luxury perfume with a smooth creamy finish.", notes:["Orchid","Vanilla","Amber"], image:"https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Pink Orchid by Floral Intense." },
  { id:"zarar", name:"Zarar", category:"men", collection:"Men", badge:"Premium", discount:"-15%", oldPrice:"PKR 3,750", price:"PKR 3,200", size:"30ml", description:"Strong masculine blend with spice, amber and dark woods.", notes:["Spice","Amber","Woods"], image:"https://images.pexels.com/photos/29821897/pexels-photo-29821897.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Zarar by Floral Intense." },
  { id:"janan-sports", name:"Janan Sports", category:"men", collection:"Men", badge:"Hot", discount:"-35%", oldPrice:"PKR 2,999", price:"PKR 1,950", size:"50ml", description:"Fresh and energetic fragrance for men with sporty confidence.", notes:["Fresh","Citrus","Aromatic"], image:"https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Janan Sports by Floral Intense." },
  { id:"royal-oud", name:"Royal Oud", category:"men", collection:"Men", badge:"Royal", discount:"-19%", oldPrice:"PKR 4,000", price:"PKR 3,250", size:"50ml", description:"Deep oud fragrance with polished luxury and long-lasting base.", notes:["Oud","Saffron","Leather"], image:"https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Royal Oud by Floral Intense." },
  { id:"blue-classic", name:"Blue Classic", category:"men", collection:"Men", badge:"Classic", discount:"-22%", oldPrice:"PKR 2,500", price:"PKR 1,950", size:"50ml", description:"Clean aquatic masculine perfume with fresh elegance.", notes:["Aquatic","Cedar","Musk"], image:"https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Blue Classic by Floral Intense." },
  { id:"signature-range", name:"Signature Range", category:"unisex", collection:"Unisex", badge:"Catalogue", price:"From PKR 800", size:"testers", description:"Complete Floral Intense range with women, men and unisex picks.", notes:["14 Scents","All Collections"], image:"https://images.pexels.com/photos/32816851/pexels-photo-32816851.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! Please share the complete Floral Intense catalogue." },
  { id:"attar-collection", name:"Attar Collection", category:"unisex", collection:"Unisex", badge:"Attar", price:"PKR 1,200", size:"6ml", description:"Alcohol-free perfume oils with deep traditional character.", notes:["Oud","Rose","Amber"], image:"https://images.pexels.com/photos/30425749/pexels-photo-30425749.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to know about Attar Collection by Floral Intense." },
  { id:"discovery-set", name:"Discovery Set", category:"tester", collection:"Tester", badge:"Tester", price:"PKR 800", size:"3–5 vials", description:"Try multiple scents before choosing your signature full bottle.", notes:["Tester Vials","Best Start"], image:"https://images.pexels.com/photos/32816851/pexels-photo-32816851.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Discovery Set by Floral Intense." },
  { id:"gift-collection", name:"Gift Collection", category:"gift", collection:"Gift", badge:"Gift", price:"PKR 3,500", size:"set", description:"Gift-ready perfume sets for Eid, birthdays and special moments.", notes:["Gift Box","2 Scents"], image:"https://images.pexels.com/photos/30999189/pexels-photo-30999189.jpeg?auto=compress&cs=tinysrgb&w=1400", whatsappText:"Hi! I want to order Gift Collection by Floral Intense." },
];

export const reviews = [
  { name:"Areeba Khan", location:"Gulshan, Karachi", initials:"AK", text:"Packaging looked premium and the scent lasted much longer than expected. Bloom Aura is soft and elegant." },
  { name:"Hamza Ahmed", location:"Bahadurabad", initials:"HA", text:"Tuscan Leather feels expensive. Projection is strong and the presentation is very clean." },
  { name:"Minaal Sheikh", location:"PECHS", initials:"MS", text:"The tester set made choosing very easy. WhatsApp ordering was simple and fast." },
];
