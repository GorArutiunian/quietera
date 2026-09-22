export type CategoryId = "sleep" | "travel" | "focus" | "pro" | "ultra";
export type ColorId = "blue" | "clear" | "black" | "sand" | "sage" | "rose" | "aurora";
export type SizeId = "s" | "m" | "l" | "xl";
export type MaterialId = "silicone" | "platinum" | "gel";
export type PackId = "single" | "couple" | "family";

export type Config = {
  category: CategoryId;
  color: ColorId;
  size: SizeId;
  material: MaterialId;
  pack: PackId;
};

export const PRODUCT = {
  name: "QuietEra Sleep Earplugs",
  tagline: "Silence. Comfort. Every night.",
  price: 39,
  compareAt: 54,
  rating: 4.9,
  reviewCount: 2847,
  sold: "50,000+",
} as const;

export const CATEGORIES: {
  id: CategoryId;
  name: string;
  short: string;
  base: number;
  compare: number;
  nrr: string;
  best: string;
  image: string;
  colors: ColorId[];
  materials: MaterialId[];
}[] = [
  {
    id: "sleep",
    name: "Sleep",
    short: "All-night snore & city seal",
    base: 39,
    compare: 54,
    nrr: "33 dB",
    best: "Bedroom · side sleepers",
    image: "/images/lifestyle-sleep.jpg",
    colors: ["blue", "clear", "black", "sand", "sage", "rose"],
    materials: ["silicone", "platinum"],
  },
  {
    id: "travel",
    name: "Travel",
    short: "Flights, hotels, red-eyes",
    base: 44,
    compare: 62,
    nrr: "30 dB",
    best: "Planes · thin walls",
    image: "/images/nightstand.jpg",
    colors: ["blue", "clear", "black", "sand"],
    materials: ["silicone", "platinum"],
  },
  {
    id: "focus",
    name: "Focus",
    short: "Office & study hush",
    base: 42,
    compare: 58,
    nrr: "27 dB",
    best: "Desk · open offices",
    image: "/images/product-closeup.jpg",
    colors: ["blue", "clear", "black", "sage"],
    materials: ["silicone"],
  },
  {
    id: "pro",
    name: "Pro",
    short: "Platinum silicone, deeper seal",
    base: 59,
    compare: 84,
    nrr: "37 dB",
    best: "Heavy snoring · cities",
    image: "/images/hero-product.jpg",
    colors: ["blue", "clear", "black", "rose", "aurora"],
    materials: ["platinum", "gel"],
  },
  {
    id: "ultra",
    name: "Ultra Seal",
    short: "Maximum block. Limited run.",
    base: 79,
    compare: 110,
    nrr: "42 dB",
    best: "Shift work · max quiet",
    image: "/images/exploded-view.jpg",
    colors: ["black", "blue", "aurora"],
    materials: ["gel"],
  },
];

export const COLORS: {
  id: ColorId;
  label: string;
  hex: string;
  image: string;
  extra: number;
  badge?: string;
}[] = [
  { id: "blue", label: "Ice Blue", hex: "#4a8dff", image: "/images/color-blue.jpg", extra: 0 },
  { id: "clear", label: "Clear", hex: "#d9e4f2", image: "/images/color-clear.jpg", extra: 0 },
  { id: "black", label: "Midnight", hex: "#1a1f2b", image: "/images/color-black.jpg", extra: 0 },
  { id: "sand", label: "Sand", hex: "#c4a574", image: "/images/color-sand.jpg", extra: 4 },
  { id: "sage", label: "Sage", hex: "#7d9a7a", image: "/images/color-sage.jpg", extra: 4 },
  { id: "rose", label: "Rose", hex: "#c9899a", image: "/images/color-rose.jpg", extra: 6, badge: "New" },
  { id: "aurora", label: "Aurora", hex: "#9bb7e8", image: "/images/color-aurora.jpg", extra: 16, badge: "Limited" },
];

export const SIZES: { id: SizeId; label: string; hint: string; extra: number }[] = [
  { id: "s", label: "S", hint: "Narrow canals", extra: 0 },
  { id: "m", label: "M", hint: "Most people", extra: 0 },
  { id: "l", label: "L", hint: "Wider canals", extra: 0 },
  { id: "xl", label: "XL", hint: "Deep / wide fit", extra: 5 },
];

export const MATERIALS: { id: MaterialId; label: string; hint: string; extra: number }[] = [
  { id: "silicone", label: "Medical silicone", hint: "Soft daily driver", extra: 0 },
  { id: "platinum", label: "Platinum silicone", hint: "Softer, longer life", extra: 14 },
  { id: "gel", label: "Memory-gel core", hint: "Deepest custom seal", extra: 18 },
];

export const PACKS: { id: PackId; name: string; pairs: number; multiplier: number; badge?: string }[] = [
  { id: "single", name: "Starter Pair", pairs: 1, multiplier: 1 },
  { id: "couple", name: "Couple Pack", pairs: 2, multiplier: 1.65, badge: "Most popular" },
  { id: "family", name: "Household Pack", pairs: 4, multiplier: 2.45, badge: "Best value" },
];

export const GALLERY = [
  { src: "/images/hero-product.jpg", alt: "QuietEra earplugs on a dark studio surface" },
  { src: "/images/product-closeup.jpg", alt: "Close-up of the QuietEra earplug" },
  { src: "/images/case-open.jpg", alt: "QuietEra travel case open with earplugs inside" },
  { src: "/images/exploded-view.jpg", alt: "QuietEra earplug disassembled into three parts" },
  { src: "/images/hand-hold.jpg", alt: "Hand holding a QuietEra earplug" },
  { src: "/images/lifestyle-sleep.jpg", alt: "Person sleeping peacefully with QuietEra" },
  { src: "/images/ear-sealed.jpg", alt: "QuietEra seated discreetly in the ear" },
  { src: "/images/nightstand.jpg", alt: "QuietEra case on a bedroom nightstand" },
];

export const STEPS = [
  { n: "01", title: "Hold", body: "Take the earplug by the core. Left and right shells are ear-specific.", image: "/images/hand-hold.jpg" },
  { n: "02", title: "Insert", body: "Place the soft silicone shell in your ear. No twisting, no deep push.", image: "/images/how-to-insert.jpg" },
  { n: "03", title: "Auto-expansion", body: "The inner plug activates and fills the canal for a custom seal.", image: "/images/exploded-view.jpg" },
  { n: "04", title: "Full seal", body: "The shell adapts to your ear. Low profile. Invisible in bed.", image: "/images/ear-sealed.jpg" },
  { n: "05", title: "Peaceful sleep", body: "No pressure. No dropping out. Silence until morning.", image: "/images/lifestyle-sleep.jpg" },
];

export const FEATURES = [
  { title: "Near-total noise blocking", body: "A three-layer seal — shell, expanding plug, and activation cap — shuts out snoring, traffic, and city noise." },
  { title: "Custom fit, no molding kit", body: "The inner plug expands inside the canal so each night feels made for your ear." },
  { title: "Medical-grade silicone", body: "Soft, hypoallergenic, and skin-kind. Comfortable for side sleepers through a full night." },
  { title: "Stays in place", body: "Ergonomic 24 × 18 mm ear-specific shape sits flush. No dangling stems." },
  { title: "Reusable for months", body: "Rinse, dry, return to the case. One pair replaces hundreds of foam plugs." },
  { title: "Five models, seven colors", body: "Sleep, Travel, Focus, Pro, and Ultra Seal — pick the spec, size, and finish that match your night." },
];

export const COMPARISON = [
  { label: "Noise seal", quietera: "Expanding custom seal", foam: "Crumples, leaks", wax: "Inconsistent" },
  { label: "Comfort all night", quietera: "Soft, no pressure", foam: "Expands too hard", wax: "Greasy residue" },
  { label: "Stays in while you sleep", quietera: "Ear-specific shape", foam: "Works out of the canal", wax: "Melts / shifts" },
  { label: "Reusable", quietera: "Months of nights", foam: "Single use", wax: "A few uses" },
  { label: "Discreet in bed", quietera: "Flush, no stem", foam: "Bright foam visible", wax: "Visible blob" },
  { label: "Hygiene", quietera: "Washable silicone", foam: "Discard after use", wax: "Picks up lint" },
];

export const REVIEWS = [
  { name: "Maya R.", city: "Austin", title: "I forgot what silence felt like", body: "My partner snores like a freight train. First night with QuietEra I slept through until my alarm.", stars: 5, verified: true },
  { name: "Daniel K.", city: "Brooklyn", title: "Side-sleeper approved", body: "Every other plug either hurt or popped out. These sit flush and do not budge.", stars: 5, verified: true },
  { name: "Priya S.", city: "London", title: "Travel essential", body: "Hotels, red-eyes, thin walls. The case is tiny and the seal is serious.", stars: 5, verified: true },
  { name: "James L.", city: "Chicago", title: "Worth more than foam", body: "I used to go through a bag of foam a month. QuietEra paid for itself in weeks.", stars: 5, verified: true },
  { name: "Elena V.", city: "Barcelona", title: "Finally, no city noise", body: "Motorbikes at 2 a.m. used to wreck me. Sleep is deep now.", stars: 5, verified: true },
  { name: "Noah P.", city: "Seattle", title: "Comfort I did not expect", body: "Narrow canals, most plugs ache. The expansion is gentle. Nine hours, zero sore spots.", stars: 4, verified: true },
];

export const FAQS = [
  { q: "How do categories change the product?", a: "Sleep is the all-night seal. Travel is tuned for cabin pressure and hotels. Focus lets more voice through. Pro uses platinum silicone at 37 dB. Ultra Seal is the maximum 42 dB limited run." },
  { q: "Why do colors cost different amounts?", a: "Ice Blue, Clear, and Midnight are core finishes. Sand and Sage are seasonal. Rose is new. Aurora is a limited iridescent run with a higher material cost." },
  { q: "Will these really block snoring?", a: "The expanding inner plug plus the silicone shell create a tight acoustic seal. Most wearers report snoring and traffic drop to a distant hush. Not a medical device." },
  { q: "Are they comfortable for side sleepers?", a: "Yes. The shell sits flush in the concha with no protruding stem. Medical-grade silicone flexes against the pillow." },
  { q: "How do I know left from right?", a: "Each pair is ear-specific. If a plug does not seat easily, try the other ear." },
  { q: "How do I clean them?", a: "Rinse with mild soap and lukewarm water. Air-dry fully, then store in the case. Do not boil or use alcohol." },
  { q: "What if they do not fit?", a: "Sleep with them for up to 30 nights. If you are not sleeping quieter, send them back for a full refund." },
  { q: "Do you ship internationally?", a: "Yes. Free shipping on orders over $50 in the US. International usually arrives in 6–12 business days." },
];

export function byId<T extends { id: string }>(list: T[], id: string) {
  return list.find((x) => x.id === id)!;
}

export function quote(cfg: Config) {
  const cat = byId(CATEGORIES, cfg.category);
  const color = byId(COLORS, cfg.color);
  const size = byId(SIZES, cfg.size);
  const mat = byId(MATERIALS, cfg.material);
  const pack = byId(PACKS, cfg.pack);
  const unit = cat.base + color.extra + size.extra + mat.extra;
  const price = Math.round(unit * pack.multiplier);
  const compare = Math.round((cat.compare + color.extra + size.extra + mat.extra) * pack.pairs);
  return { cat, color, size, mat, pack, unit, price, compare };
}

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export const DEFAULT_CONFIG: Config = {
  category: "sleep",
  color: "blue",
  size: "m",
  material: "silicone",
  pack: "couple",
};
