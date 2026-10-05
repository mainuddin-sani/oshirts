import { FiTruck, FiZap, FiClock, FiShield, FiPenTool, FiRefreshCw } from "react-icons/fi";

import { findStyle, garmentImage, colorSwatches } from "@/components/Catagory/DesignStudio/designStudioData";

import sleeveLeft from "@/assets/images/sleeve-left.webp";
import sleeveRight from "@/assets/images/sleeve-right.webp";

/* =========================================================
   THE ORDER IN PROGRESS
   Mirrors what the design studio hands over: one garment
   style, one colour, a size run and the printed locations.
   ========================================================= */

const STYLE_ID = "hanes-hooded-sweatshirt";
const COLOR = "Black";
const CATEGORY_SLUG = "sweats-sweatshirts";

const style = findStyle(STYLE_ID);

export const order = {
  styleId: STYLE_ID,
  brand: style.brand,
  name: style.name,
  color: COLOR,
  colorHex: colorSwatches[COLOR],
  description: style.description,

  frontImage: garmentImage(STYLE_ID, COLOR, "front"),
  backImage: garmentImage(STYLE_ID, COLOR, "back"),

  /* The four views a customer inspects before placing the order. */
  views: [
    { id: "front", label: "Front", image: garmentImage(STYLE_ID, COLOR, "front") },
    { id: "back", label: "Back", image: garmentImage(STYLE_ID, COLOR, "back") },
    { id: "right", label: "Right", image: sleeveRight },
    { id: "left", label: "Left", image: sleeveLeft },
  ],

  productHref: `/products/${CATEGORY_SLUG}/${style.id}`,
  designHref: `/products/${CATEGORY_SLUG}/${style.id}/design?style=${style.id}&color=${encodeURIComponent(
    COLOR
  )}&qty=48`,

  sizes: [
    { label: "S", qty: 6 },
    { label: "M", qty: 14 },
    { label: "L", qty: 16 },
    { label: "XL", qty: 8 },
    { label: "2XL", qty: 4 },
  ],

  prints: [
    {
      view: "Front",
      method: "Screen print",
      size: '11" × 14"',
      inks: ["#ffffff", "#e4572e", "#f5a524"],
      unitPrice: 2.4,
    },
    {
      view: "Back",
      method: "Screen print",
      size: '4" × 4"',
      inks: ["#ffffff"],
      unitPrice: 1.6,
    },
  ],

  unitPrice: style.price,
};

export const quantity = order.sizes.reduce((total, size) => total + size.qty, 0);

/* =========================================================
   PRICING
   ========================================================= */

export const TAX_RATE = 0.0825;

/** Volume discount applied to the garment subtotal. */
const VOLUME_TIERS = [
  { min: 288, rate: 0.12 },
  { min: 96, rate: 0.08 },
  { min: 48, rate: 0.05 },
];

export const deliveryOptions = [
  {
    id: "standard",
    icon: FiTruck,
    label: "Standard",
    price: 0,
    priceLabel: "Free",
    businessDays: [7, 10],
    text: "Production plus ground shipping.",
  },
  {
    id: "express",
    icon: FiZap,
    label: "Express",
    price: 24.95,
    businessDays: [4, 5],
    text: "Priority production, 2-day carrier.",
    badge: "Most chosen",
  },
  {
    id: "rush",
    icon: FiClock,
    label: "Rush",
    price: 59.95,
    businessDays: [2, 3],
    text: "Front of the press queue, overnight carrier.",
  },
];

export const findDelivery = (id) =>
  deliveryOptions.find((option) => option.id === id) || deliveryOptions[0];

/** Single source of truth for every money figure shown in checkout. */
export function calculateTotals(deliveryId = "standard") {
  const garments = order.unitPrice * quantity;
  const printing = order.prints.reduce((total, print) => total + print.unitPrice * quantity, 0);

  const tier = VOLUME_TIERS.find((entry) => quantity >= entry.min);
  const discount = tier ? garments * tier.rate : 0;

  const shipping = findDelivery(deliveryId).price;
  const subtotal = garments + printing - discount;
  const tax = (subtotal + shipping) * TAX_RATE;

  return {
    garments,
    printing,
    discount,
    discountRate: tier ? tier.rate : 0,
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    perShirt: (subtotal + shipping + tax) / quantity,
  };
}

export const money = (value) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Business-day offset from today, used for the delivery estimates. */
export function businessDaysFrom(days, from = new Date()) {
  const date = new Date(from);
  let remaining = days;

  while (remaining > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }

  return date;
}

export const formatDate = (date) =>
  date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

/* =========================================================
   FLOW
   ========================================================= */

export const steps = [
  { id: "summary", label: "Summary", href: "/checkout/summary" },
  { id: "instructions", label: "Instructions", href: "/checkout/instructions" },
  { id: "shipping", label: "Shipping", href: "/checkout/shipping" },
  { id: "payment", label: "Payment", href: "/checkout/payment" },
];

export const assurances = [
  { icon: FiPenTool, text: "Free design review before we print" },
  { icon: FiRefreshCw, text: "Free reprint or refund if we miss the mockup" },
  { icon: FiShield, text: "Nothing charged until your proof is approved" },
];

/** Order reference for the confirmation page. A real gateway would return
 * this; until then it is generated at submit time, outside render. */
export function newOrderReference() {
  const now = new Date();
  return {
    id: `OS-${now.getTime().toString().slice(-6)}`,
    placedAt: now.toISOString(),
  };
}

export const countries = ["United States", "Canada"];

export const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
  "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA",
  "WV", "WI", "WY",
];

export const MAX_INSTRUCTIONS = 500;

export const ARTWORK_TYPES = ".ai,.eps,.pdf,.png,.jpg,.jpeg,.svg";

export const MAX_ARTWORK_MB = 25;
