import {
  FiInfo,
  FiMail,
  FiStar,
  FiCode,
  FiPackage,
  FiFileText,
  FiShoppingBag,
  FiEye,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiPenTool,
  FiZap,
  FiLayers,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
} from "react-icons/fi";

import { site } from "@/data/home";

/* =========================================================
   SECTION NAVIGATION
   ========================================================= */

export const aboutNav = [
  { label: "About Us", href: "/about", icon: FiInfo },
  { label: "Contact Us", href: "/contact", icon: FiMail },
  { label: "Our Reviews", href: "/reviews", icon: FiStar },
  { label: "Fulfillment API", href: "/fulfillment-api", icon: FiCode },
  { label: "Contract Printing", href: "/contract-printing", icon: FiPackage },
  { label: "Press", href: "/press", icon: FiFileText },
  { label: "TeeChip Stores", href: "/teechip-stores", icon: FiShoppingBag },
];

/* =========================================================
   ABOUT US
   ========================================================= */

export const aboutUs = {
  eyebrow: "About us",
  title: "We make custom apparel worth wearing.",
  lead: "We started in a garage in 2009 with one press and a simple rule: never ship a shirt we would not wear ourselves. Sixteen years and ten million shirts later, that rule still decides everything.",

  stats: [
    { value: "10M+", label: "Shirts printed since 2009" },
    { value: "4.9", label: "Average rating, 18k reviews" },
    { value: "230", label: "People across two facilities" },
    { value: "48h", label: "Fastest rush turnaround" },
  ],

  story: [
    "Most printers treat a small order as a nuisance and a big one as a licence to add fees. We built the opposite business. The same specialists, the same blanks and the same colour standards apply whether you order twelve shirts for a family reunion or twelve thousand for a national rollout.",
    "Everything happens under two roofs in Austin and Reno — screen printing, DTG, embroidery, folding and shipping. Nothing is brokered out, so when we promise a date, it is our own press schedule we are promising, not somebody else's.",
  ],

  values: [
    {
      icon: FiEye,
      title: "A human checks every design",
      text: "Before anything hits the press, a print specialist reviews resolution, colour separation and placement — and tells you when something will not print well.",
    },
    {
      icon: FiDollarSign,
      title: "The price you see is the price",
      text: "No setup fees, no screen charges, no surprise handling line at checkout. Volume pricing is published, not negotiated case by case.",
    },
    {
      icon: FiTruck,
      title: "Shipping is on us",
      text: "Free ground shipping on every order, with rush options down to 48 hours when a deadline moves.",
    },
    {
      icon: FiShield,
      title: "We fix our mistakes",
      text: "If the print misses the approved mockup, we reprint or refund it. No restocking games, no argument about who is right.",
    },
  ],

  timeline: [
    { year: "2009", title: "One press, one garage", text: "Two founders, a used six-colour press and a first order of 48 shirts for a local band." },
    { year: "2014", title: "Austin facility opens", text: "Screen printing, DTG and embroidery move under one 40,000 sq ft roof." },
    { year: "2019", title: "Free design review becomes standard", text: "Every order gets specialist eyes on the artwork, at no cost, regardless of size." },
    { year: "2023", title: "Reno opens for the West Coast", text: "Second facility halves transit times for the western half of the country." },
    { year: "2026", title: "Ten million shirts", text: "Same rule as the first day: never ship a shirt we would not wear." },
  ],
};

/* =========================================================
   CONTACT US
   ========================================================= */

export const contactUs = {
  eyebrow: "Contact us",
  title: "Talk to a print specialist.",
  lead: "Real people, not a ticket queue. Most questions are answered in under 12 minutes during opening hours.",

  channels: [
    {
      icon: FiHeadphones,
      title: "Call us",
      value: site.phone,
      href: `tel:${site.phone.replace(/[^0-9]/g, "")}`,
      text: site.hours,
    },
    {
      icon: FiMail,
      title: "Email us",
      value: site.email,
      href: `mailto:${site.email}`,
      text: "Replies within one business hour.",
    },
    {
      icon: FiPenTool,
      title: "Artwork help",
      value: "art@ooshirts.com",
      href: "mailto:art@ooshirts.com",
      text: "Send files for a free print check.",
    },
  ],

  topics: ["Quote or pricing", "Artwork and proofs", "An existing order", "Contract printing", "API or integrations", "Something else"],

  offices: [
    { city: "Austin, TX", lines: ["1200 Press Avenue, Suite 300", "Austin, TX 78701"], note: "Head office and main facility" },
    { city: "Reno, NV", lines: ["4488 Vista Industrial Way", "Reno, NV 89502"], note: "West coast fulfilment" },
  ],
};

/* =========================================================
   OUR REVIEWS
   ========================================================= */

export const ourReviews = {
  eyebrow: "Our reviews",
  title: "What 18,412 customers say.",
  lead: "Every review below is from a verified order. We publish the critical ones too — they are usually how we found something worth fixing.",

  breakdown: [
    { stars: 5, share: 86 },
    { stars: 4, share: 9 },
    { stars: 3, share: 3 },
    { stars: 2, share: 1 },
    { stars: 1, share: 1 },
  ],

  highlights: [
    { value: "97%", label: "Would order again" },
    { value: "99.2%", label: "Delivered on or before the promised date" },
    { value: "0.6%", label: "Orders needing a reprint" },
  ],
};

/* =========================================================
   FULFILLMENT API
   ========================================================= */

export const fulfillmentApi = {
  eyebrow: "Fulfillment API",
  title: "Print and ship on demand, from your own storefront.",
  lead: "One REST endpoint turns an order in your system into a printed, packed and tracked shipment out of our facilities. No inventory, no minimums.",

  features: [
    { icon: FiZap, title: "Order to press in minutes", text: "Orders received before 2pm local enter the same day's production run." },
    { icon: FiLayers, title: "Blind and branded packing", text: "Your packing slip, your return address, your tissue and stickers if you send them." },
    { icon: FiTruck, title: "Live rates and tracking", text: "Quote carrier rates at checkout, then push tracking numbers back automatically." },
    { icon: FiShield, title: "Idempotent and versioned", text: "Every write takes an idempotency key, and versions are supported for 24 months after deprecation." },
  ],

  sample: `curl -X POST https://api.ooshirts.com/v1/orders \\
  -H "Authorization: Bearer $OOSHIRTS_KEY" \\
  -H "Idempotency-Key: 9f2c-4b71" \\
  -d '{
    "external_id": "store-10482",
    "shipping": { "name": "Dana Whitfield", "zip": "78701" },
    "items": [
      { "sku": "hanes-hoodie-black-l", "quantity": 2,
        "artwork": { "front": "https://cdn.you.com/art/front.png" } }
    ]
  }'`,

  endpoints: [
    { method: "POST", path: "/v1/orders", text: "Create an order and enter production" },
    { method: "GET", path: "/v1/orders/:id", text: "Status, proof and tracking" },
    { method: "GET", path: "/v1/catalog", text: "Blanks, colours, sizes and live pricing" },
    { method: "POST", path: "/v1/quotes", text: "Price and delivery estimate before you commit" },
    { method: "POST", path: "/v1/webhooks", text: "Subscribe to proof, print and shipment events" },
  ],
};

/* =========================================================
   CONTRACT PRINTING
   ========================================================= */

export const contractPrinting = {
  eyebrow: "Contract printing",
  title: "Our presses, your brand on the label.",
  lead: "Bring your own blanks or buy ours. We print, fold, poly-bag and ship under your name, with capacity reserved on the schedule you agree.",

  capabilities: [
    { icon: FiLayers, title: "Screen printing", text: "Up to 12 colours, water-based and plastisol, on manual and automatic presses." },
    { icon: FiPenTool, title: "DTG and DTF", text: "Photographic detail with no minimum, ideal for short runs and sample rounds." },
    { icon: FiPackage, title: "Embroidery", text: "Up to 15 heads, digitising included, caps and heavyweight outerwear supported." },
    { icon: FiTrendingUp, title: "Finishing", text: "Relabelling, hem tags, folding, poly-bagging, hangtags and retail-ready cartons." },
  ],

  tiers: [
    { volume: "500 – 2,499", lead: "7 business days", price: "from $2.10 / print" },
    { volume: "2,500 – 9,999", lead: "9 business days", price: "from $1.62 / print" },
    { volume: "10,000 – 49,999", lead: "12 business days", price: "from $1.24 / print" },
    { volume: "50,000+", lead: "Scheduled", price: "Quoted per programme" },
  ],

  process: [
    { title: "Send the spec", text: "Garments, print locations, colours, volumes and the date it has to land." },
    { title: "Strike-off approval", text: "We print a physical sample and ship it for sign-off before the run." },
    { title: "Reserved capacity", text: "Your run gets a locked slot on the press schedule, not a best-effort slot." },
    { title: "Ship or store", text: "Straight to your warehouse, split to stores, or held here for release." },
  ],
};

/* =========================================================
   PRESS
   ========================================================= */

export const press = {
  eyebrow: "Press",
  title: "Press and media resources.",
  lead: "Logos, facts and photography for anyone writing about us. For interviews or facility visits, the press desk answers same day.",

  facts: [
    { label: "Founded", value: "2009, Austin, Texas" },
    { label: "Employees", value: "230 across two facilities" },
    { label: "Shirts printed", value: "Over 10 million" },
    { label: "Facilities", value: "Austin, TX and Reno, NV" },
  ],

  coverage: [
    { outlet: "Printwear Monthly", title: "How a garage printer built a 10-million-shirt business without a single broker", date: "May 2026" },
    { outlet: "Austin Business Journal", title: "ooShirts adds 60 jobs as second facility hits full capacity", date: "February 2026" },
    { outlet: "Apparel Tech Review", title: "The fulfilment API quietly powering thousands of creator storefronts", date: "November 2025" },
    { outlet: "Small Business Weekly", title: "Why free design review became a competitive advantage", date: "July 2025" },
  ],

  kit: [
    { title: "Logo pack", text: "SVG and PNG marks, light and dark, with clear-space rules." },
    { title: "Facility photography", text: "High-resolution press floor, finishing and shipping images." },
    { title: "Fact sheet", text: "One page of company history, scale and leadership bios." },
  ],

  contact: { name: "Press desk", email: "press@ooshirts.com" },
};

/* =========================================================
   TEECHIP STORES
   ========================================================= */

export const teechipStores = {
  eyebrow: "TeeChip Stores",
  title: "Sell your designs. We handle everything after checkout.",
  lead: "Launch a storefront in an afternoon, keep the margin you set, and never touch inventory. We print, pack and ship each order as it comes in.",

  steps: [
    { icon: FiPenTool, title: "Upload your design", text: "Drop artwork onto any blank in the catalogue and set your own retail price." },
    { icon: FiShoppingBag, title: "Share your store", text: "Get a hosted storefront and product pages, or embed a buy button on your own site." },
    { icon: FiPackage, title: "We print and ship", text: "Each order goes into production the day it lands, packed under your branding." },
    { icon: FiDollarSign, title: "Get paid weekly", text: "Your margin lands every Friday. No fees for listing, hosting or unsold stock." },
  ],

  features: [
    { icon: FiUsers, title: "Built for creators and teams", text: "Fan merch, club kit, campaign shirts and fundraisers all run the same way." },
    { icon: FiZap, title: "No minimums, ever", text: "Sell one shirt or ten thousand — the per-unit price is the same tier pricing." },
    { icon: FiTruck, title: "Your customers, tracked", text: "Buyers get branded confirmation and tracking emails from your store name." },
  ],

  faqs: [
    { q: "What does it cost to open a store?", a: "Nothing. There is no listing, hosting or subscription fee — we take the base price of each item sold and you keep the rest." },
    { q: "Who handles returns?", a: "We do. Print defects are reprinted at our cost; size exchanges are handled through our support team under your store's name." },
    { q: "Can I use my own domain?", a: "Yes. Point a subdomain at your store, or embed products directly into an existing site." },
  ],
};
