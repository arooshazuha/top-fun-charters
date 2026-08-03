/**
 * Photo gallery manifest. Dimensions are the real optimized sizes (for zero-CLS
 * next/image + masonry). Alt text is deliberately honest and general, it
 * describes the yacht / charter / Anna Maria setting without claiming specifics
 * that can't be verified from a single frame.
 */

export type GalleryCategory =
  | "Aerial"
  | "The Yacht"
  | "Destinations"
  | "Marina"
  | "On Board & Days Out"
  | "Videos";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
  /** Marks strong hero-grade shots for feature placement. */
  featured?: boolean;
};

/**
 * Unified gallery item used by the grid + lightbox. Curated images and the
 * auto-generated media manifest (new photos + videos) both resolve to this.
 */
export type GalleryMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  width: number;
  height: number;
  category: GalleryCategory;
  /** Poster frame shown for video items. */
  poster?: string;
  featured?: boolean;
};

const L = { width: 1800, height: 1350 }; // landscape gallery default
const P = { width: 1350, height: 1800 }; // portrait gallery

/** Rotating, always-true captions for the day-out set. */
const ONBOARD_ALTS = [
  "Guests enjoying a private charter aboard Top Fun near Anna Maria Island",
  "A day on the Gulf of Mexico with Top Fun Charters",
  "The Top Fun yacht on turquoise water off Anna Maria Island",
  "Relaxing on deck during a private Anna Maria Island yacht charter",
  "Sunshine and open water on a Top Fun Charters day trip",
  "Cruising the Bradenton and Anna Maria Island coastline aboard Top Fun",
];

const portraits = new Set([21, 24, 28]);

const onboard: GalleryImage[] = Array.from({ length: 33 }, (_, i) => {
  const n = i + 1;
  const dims = portraits.has(n) ? P : L;
  return {
    src: `/images/gallery-${String(n).padStart(2, "0")}.jpg`,
    alt: ONBOARD_ALTS[i % ONBOARD_ALTS.length],
    ...dims,
    category: "On Board & Days Out" as const,
  };
});

export const GALLERY: GalleryImage[] = [
  // Aerials (drone), the strongest shots
  { src: "/images/aerial-turquoise-water.jpg", alt: "Aerial view of the Top Fun yacht cruising turquoise Gulf water near Anna Maria Island", width: 2200, height: 1238, category: "Aerial", featured: true },
  { src: "/images/aerial-overhead-yacht.jpg", alt: "Overhead aerial of the Top Fun yacht underway with guests on the bow", width: 2600, height: 1025, category: "Aerial", featured: true },
  { src: "/images/aerial-yacht-wake.jpg", alt: "Top Fun yacht carving a wake across the Gulf near Anna Maria Island", width: 2200, height: 1238, category: "Aerial" },
  { src: "/images/aerial-coastline.jpg", alt: "The Top Fun yacht cruising along the Anna Maria Island coastline", width: 2200, height: 1238, category: "Aerial" },
  { src: "/images/aerial-sandbar.jpg", alt: "Top Fun yacht anchored at a turquoise sandbar off Anna Maria Island", width: 2200, height: 1238, category: "Aerial", featured: true },
  { src: "/images/aerial-cruising.jpg", alt: "Aerial of Top Fun Charters cruising open water off Bradenton, Florida", width: 2200, height: 1238, category: "Aerial" },
  { src: "/images/aerial-bow.jpg", alt: "Bow view of the Top Fun luxury yacht from above", width: 2200, height: 1238, category: "Aerial" },
  { src: "/images/aerial-open-water.jpg", alt: "Top Fun yacht on open Gulf water near Anna Maria Island", width: 2200, height: 1095, category: "Aerial" },

  // The Yacht
  { src: "/images/yacht-front-view.jpg", alt: "The 50-foot Top Fun luxury yacht anchored on a calm Gulf sandbar", width: 2000, height: 1500, category: "The Yacht", featured: true },

  // Destinations
  { src: "/images/egmont-key.jpg", alt: "Egmont Key, a remote white-sand island reached by Top Fun Charters", width: 1024, height: 768, category: "Destinations" },
  { src: "/images/egmont-key-beach.jpg", alt: "White-sand beach at Egmont Key near Anna Maria Island", width: 1080, height: 1350, category: "Destinations" },
  { src: "/images/egmont-key-shelling.jpg", alt: "Shelling along the shoreline near Anna Maria Island", width: 1200, height: 900, category: "Destinations" },
  { src: "/images/bean-point-anna-maria.jpg", alt: "Bean Point at the north tip of Anna Maria Island", width: 2000, height: 1500, category: "Destinations" },

  // Marina
  { src: "/images/pier-77-marina.jpg", alt: "Safe Harbor Pier 77 Marina in Bradenton, the Top Fun Charters departure point", width: 2000, height: 1500, category: "Marina" },
  { src: "/images/marina-pickup-view.jpg", alt: "View across Safe Harbor Pier 77 Marina near Anna Maria Island", width: 1712, height: 1096, category: "Marina" },

  // Days out / on board
  ...onboard,
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Aerial",
  "The Yacht",
  "Destinations",
  "On Board & Days Out",
  "Videos",
  "Marina",
];
