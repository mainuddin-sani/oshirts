import { FiCheckCircle, FiEdit3, FiPackage } from "react-icons/fi";

import {
  colorSwatches,
  findStyle,
  garmentImage,
} from "@/components/Catagory/DesignStudio/designStudioData";
import { money } from "@/data/checkout";

/* =========================================================
   SAVED DESIGNS
   Demo records. A real build swaps lookupDesigns/findDesign
   for API calls — the shape they return is all the UI
   depends on.
   ========================================================= */

/** Where a design sits in its life: what you can still do with it. */
export const statuses = {
  draft: {
    id: "draft",
    label: "Draft",
    tone: "amber",
    icon: FiEdit3,
    text: "Still being worked on — add a size run to price it up.",
    canCheckout: false,
  },
  ready: {
    id: "ready",
    label: "Ready to order",
    tone: "accent",
    icon: FiCheckCircle,
    text: "Artwork and sizes are set. Send it to checkout whenever you are ready.",
    canCheckout: true,
  },
  ordered: {
    id: "ordered",
    label: "Ordered",
    tone: "success",
    icon: FiPackage,
    text: "This design has already been printed. Reorder it or use it as a starting point.",
    canCheckout: false,
  },
};

/* Category slugs the product and studio routes expect, by garment type. */
const CATEGORY_SLUGS = { tee: "t-shirts", hoodie: "sweats-sweatshirts" };

/* Dates are fixed rather than computed from "days ago" so the server and the
   browser always render the same string, and a prerendered page never drifts. */
const records = [
  {
    email: "dana@summitrobotics.com",
    designs: [
      {
        id: "DS-8F42QX",
        name: "Summit Robotics — Season Kit",
        styleId: "hanes-hooded-sweatshirt",
        color: "Black",
        status: "draft",
        savedAt: "2026-09-18",
        createdAt: "2026-09-17",
        note: "Front crest only so far — back number block still to come.",
        sizes: [],
        prints: [{ view: "Front", method: "Screen print", size: '10" × 12"', inks: ["#ffffff", "#e4572e"] }],
      },
      {
        id: "DS-5KD017",
        name: "Hack Night 2026",
        styleId: "classic-cotton-tee",
        color: "White",
        status: "ready",
        savedAt: "2026-09-14",
        createdAt: "2026-09-02",
        note: "Approved by the organising team on 12 Sep.",
        sizes: [
          { label: "S", qty: 8 },
          { label: "M", qty: 18 },
          { label: "L", qty: 20 },
          { label: "XL", qty: 10 },
          { label: "2XL", qty: 4 },
        ],
        prints: [
          { view: "Front", method: "Screen print", size: '11" × 14"', inks: ["#111111", "#e4572e", "#f5a524"] },
          { view: "Back", method: "Screen print", size: '4" × 4"', inks: ["#111111"] },
        ],
      },
      {
        id: "DS-3QW885",
        name: "Field Team Tee",
        styleId: "heavyweight-tee",
        color: "Navy",
        status: "ready",
        savedAt: "2026-08-30",
        createdAt: "2026-08-24",
        note: "Left sleeve carries the sponsor mark.",
        sizes: [
          { label: "M", qty: 12 },
          { label: "L", qty: 16 },
          { label: "XL", qty: 8 },
        ],
        prints: [
          { view: "Front", method: "DTG", size: '9" × 9"', inks: ["#ffffff", "#bcdcef"] },
          { view: "Left Sleeve", method: "Screen print", size: '2" × 2"', inks: ["#ffffff"] },
        ],
      },
      {
        id: "DS-9BX204",
        name: "Mentor Hoodies",
        styleId: "champion-reverse-weave",
        color: "Gray",
        status: "ordered",
        savedAt: "2026-07-22",
        createdAt: "2026-07-15",
        orderNumber: "OS-48219",
        note: "Printed and delivered — reorder uses the same separations.",
        sizes: [
          { label: "M", qty: 6 },
          { label: "L", qty: 10 },
          { label: "XL", qty: 8 },
        ],
        prints: [{ view: "Front", method: "Screen print", size: '8" × 8"', inks: ["#111111", "#b93632"] }],
      },
      {
        id: "DS-1TZ760",
        name: "Open House Giveaway",
        styleId: "premium-tee",
        color: "Cream",
        status: "ready",
        savedAt: "2026-06-11",
        createdAt: "2026-06-04",
        note: "Big run — priced at the 96+ tier.",
        sizes: [
          { label: "S", qty: 20 },
          { label: "M", qty: 40 },
          { label: "L", qty: 40 },
          { label: "XL", qty: 20 },
        ],
        prints: [{ view: "Front", method: "Screen print", size: '12" × 12"', inks: ["#e4572e", "#26384d"] }],
      },
    ],
  },
  {
    email: "alex@northsidefc.org",
    designs: [
      {
        id: "DS-6NP318",
        name: "Northside FC — Warmups",
        styleId: "gildan-heavy-blend-zip",
        color: "Navy",
        status: "ready",
        savedAt: "2026-09-08",
        createdAt: "2026-09-01",
        note: "Club crest front, player initials on the back.",
        sizes: [
          { label: "S", qty: 6 },
          { label: "M", qty: 12 },
          { label: "L", qty: 10 },
          { label: "XL", qty: 4 },
        ],
        prints: [
          { view: "Front", method: "Screen print", size: '4" × 5"', inks: ["#ffffff", "#f5a524"] },
          { view: "Back", method: "Screen print", size: '10" × 4"', inks: ["#ffffff"] },
        ],
      },
      {
        id: "DS-4RV592",
        name: "Supporters Tee",
        styleId: "classic-cotton-tee",
        color: "Sky",
        status: "ordered",
        savedAt: "2026-05-19",
        createdAt: "2026-05-10",
        orderNumber: "OS-20517",
        note: "Terrace print from the 2026 season.",
        sizes: [
          { label: "M", qty: 60 },
          { label: "L", qty: 60 },
          { label: "XL", qty: 30 },
        ],
        prints: [{ view: "Front", method: "Screen print", size: '12" × 16"', inks: ["#26384d", "#ffffff"] }],
      },
    ],
  },
  /* A real account that simply has nothing saved yet — drives the empty state. */
  {
    email: "sam@brightlabs.io",
    designs: [],
  },
];

/** One sample address surfaced in the UI so the page can be tried out. */
export const sampleEmail = records[0].email;

/** Every address that has an account, for the "no designs" vs "no account" split. */
const normaliseEmail = (value = "") => value.trim().toLowerCase();

export const formatSavedDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/** "3 days ago" / "2 months ago", relative to a reference date. */
export function relativeSavedDate(iso, from = new Date()) {
  const saved = new Date(`${iso}T12:00:00Z`);
  const days = Math.max(0, Math.round((from - saved) / 86_400_000));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;

  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

  const years = Math.round(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

/**
 * Resolve one stored record into everything the cards and the detail page
 * render: garment copy, mockups per view, the size run, print locations and
 * an indicative price.
 */
function resolveDesign(design, email) {
  const style = findStyle(design.styleId);
  const status = statuses[design.status] || statuses.draft;
  const categorySlug = CATEGORY_SLUGS[style.category] || "t-shirts";
  const quantity = design.sizes.reduce((total, size) => total + size.qty, 0);

  const garments = style.price * quantity;
  const printing = design.prints.length * 1.9 * quantity;
  const subtotal = garments + printing;

  // Only the views this design actually prints on, plus the front shot, which
  // is always the thumbnail.
  const printedViews = design.prints.map((print) => print.view);
  const views = [
    { id: "front", label: "Front", image: garmentImage(style.id, design.color, "front") },
    { id: "back", label: "Back", image: garmentImage(style.id, design.color, "back") },
  ];

  const designQuery = new URLSearchParams({
    style: style.id,
    color: design.color,
    ...(quantity ? { qty: String(quantity) } : {}),
  });

  return {
    ...design,
    email,
    status,
    quantity,
    printedViews,
    views,
    thumbnail: views[0].image,
    thumbnailAlt: `${design.name} on a ${design.color.toLowerCase()} ${style.name}`,

    style: {
      id: style.id,
      brand: style.brand,
      name: style.name,
      description: style.description,
      price: style.price,
      category: style.category,
    },
    colorHex: colorSwatches[design.color] || "#111111",

    savedLabel: formatSavedDate(design.savedAt),
    createdLabel: formatSavedDate(design.createdAt),

    pricing: quantity
      ? {
          garments: money(garments),
          printing: money(printing),
          subtotal: money(subtotal),
          perShirt: money(subtotal / quantity),
        }
      : null,

    productHref: `/products/${categorySlug}/${style.id}`,
    designHref: `/products/${categorySlug}/${style.id}/design?${designQuery.toString()}`,
    orderHref: design.orderNumber ? `/order-status?number=${design.orderNumber}` : null,
  };
}

/**
 * Look designs up by email. Returns null when the address has no account at
 * all, and an array — possibly empty — when it does. Newest first.
 */
export function lookupDesigns(email) {
  const wanted = normaliseEmail(email);
  const record = records.find((entry) => entry.email === wanted);
  if (!record) return null;

  return record.designs
    .map((design) => resolveDesign(design, record.email))
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

/** Resolve a single design by its ID, across every account. */
export function findDesign(id) {
  const wanted = (id || "").trim().toUpperCase();

  for (const record of records) {
    const design = record.designs.find((entry) => entry.id === wanted);
    if (design) return resolveDesign(design, record.email);
  }

  return null;
}

/** Every design ID, so the detail route can prerender. */
export const allDesignIds = records.flatMap((record) =>
  record.designs.map((design) => design.id)
);

/** Other designs saved to the same account, for the detail page's footer. */
export function relatedDesigns(id, limit = 3) {
  const current = findDesign(id);
  if (!current) return [];

  return (lookupDesigns(current.email) || [])
    .filter((design) => design.id !== current.id)
    .slice(0, limit);
}
