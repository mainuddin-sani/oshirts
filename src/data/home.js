import {
  FiTag,
  FiAward,
  FiHeadphones,
  FiTruck,
  FiShield,
  FiEye,
  FiZap,
  FiPackage,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiPenTool,
  FiCheckCircle,
} from "react-icons/fi";
import {
  GiTShirt,
  GiHoodie,
  GiShirt,
  GiRunningShoe,
  GiMonclerJacket,
  GiLargeDress,
  GiPoloShirt,
} from "react-icons/gi";

import teeBlack from "@/assets/images/tee-black.webp";
import teeWhite from "@/assets/images/tee-white.webp";
import teeCream from "@/assets/images/tee-cream.webp";
import teeSky from "@/assets/images/tee-sky.webp";
import teeBlue from "@/assets/images/tee-blue.webp";
import teeGray from "@/assets/images/tee-gray.webp";
import teePink from "@/assets/images/tee-pink.webp";
import teeBlackBack from "@/assets/images/tee-black-back.webp";
import printBlackMountain from "@/assets/images/custom-hoodies.png";
import printBlackDemon from "@/assets/images/print-black-demon.webp";
import printCreamMountain from "@/assets/images/custom-sweatshirts.png";
// import printWhiteGarage from "@/assets/images/print-white-garage.webp";
import printWhiteGarage from "@/assets/images/custom-sweatshirts.png";
import printSkyWild from "@/assets/images/print-sky-wild.webp";
import printBlueGarage from "@/assets/images/print-blue-garage.webp";
import printGrayWild from "@/assets/images/print-gray-wild.webp";
import printPinkMountain from "@/assets/images/custom-sweatshirts.png";
import badgeMountain from "@/assets/images/badge-mountain.webp";
import badgeWild from "@/assets/images/badge-wild.webp";
import badgeGarage from "@/assets/images/badge-garage.webp";
import logo1 from "@/assets/images/logo1.png";
import logo2 from "@/assets/images/logo2.png";

export const images = {
  teeBlack,
  teeWhite,
  teeCream,
  teeSky,
  teeBlue,
  teeGray,
  teePink,
  teeBlackBack,
  printBlackMountain,
  printBlackDemon,
  printCreamMountain,
  printWhiteGarage,
  printSkyWild,
  printBlueGarage,
  printGrayWild,
  printPinkMountain,
  badgeMountain,
  badgeWild,
  badgeGarage,
};

export const site = {
  name: "ooShirts",
  tagline: "Custom apparel printing, done properly.",
  phone: "1-800-555-0199",
  email: "hello@ooshirts.com",
  hours: "Mon–Fri, 8am–8pm ET",
  ctaPrimary: { label: "Start designing", href: "/design" },
  ctaSecondary: { label: "Get a quote", href: "/quote" },
};

export const nav = [
  { label: "Products", href: "#products", mega: true },
  { label: "How it works", href: "#how-it-works" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const productsMenu = [
  {
    title: "T-Shirts",
    slug: "t-shirts",
    items: ["Short Sleeve", "Long Sleeve", "Sleeveless"],
  },
  {
    title: "Youth Shirts",
    slug: "youth-shirts",
    items: ["T-Shirts", "Sweats"],
  },
  {
    title: "Women's T-Shirts",
    slug: "womens-t-shirts",
    items: ["Short Sleeve", "Long Sleeve", "Tank Tops", "Underwear"],
  },
  {
    title: "Athletic Shirts",
    slug: "athletic-shirts",
    items: ["Performance Shirts", "Ladies Performance"],
  },
  {
    title: "Sweatshirts",
    slug: "sweats-sweatshirts",
    items: ["Sweatshirts", "Hoodies", "Zip Hoodies"],
  },
  {
    title: "Pants",
    slug: "pants",
    items: ["Sweatpants", "Shorts", "Ladies Pants"],
  },
];

export const hero = {
  eyebrow: "Custom T-shirts & apparel printing",
  title: "Print the shirt people actually want to wear.",
  // title: ["Print the shirt", "people actually", "want to wear."],
  description:
    "Premium blanks, colour-true prints and a real human checking every design before it hits the press. From 12 shirts to 12,000 — priced honestly, shipped free.",
  proof: [
    { value: "4.9/5", label: "from 18,400+ reviews" },
    { value: "10M+", label: "shirts printed" },
    { value: "Free", label: "shipping & design review" },
  ],
  chips: [
    { label: "From $4.99 / shirt", sub: "at 150+ units" },
    { label: "Ships in 3 days", sub: "rush available" },
  ],
};

export const benefits = [
  { icon: FiTag, title: "Low price guarantee", text: "Find it cheaper? We'll match it and take another 5% off." },
  { icon: FiAward, title: "Premium print quality", text: "Screen, DTG and embroidery on blanks we'd wear ourselves." },
  { icon: FiHeadphones, title: "Expert support", text: "Real print specialists on chat, email and phone — 7 days a week." },
  { icon: FiTruck, title: "Free & fast shipping", text: "Free ground shipping on every order, rush options to 48 hours." },
];



// export const categories = [
//   {
//     slug: "t-shirts",
//     name: "Custom T-Shirts",
//     blurb:
//       "Classic, heavyweight and premium ring-spun tees in 40+ colours.",
//     price: "From $4.99",
//     image: printBlackMountain,
//     imageAlt:
//       "Black custom T-shirt with a full-colour mountain graphic printed on the chest",
//     featured: true,
//     tone: "paper",
//     label: "Most popular",
//   },
//   {
//     slug: "womens",
//     name: "Custom Women's T-Shirts",
//     blurb:
//       "Relaxed, fitted and cropped styles designed for everyday wear.",
//     price: "From $6.49",
//     image: printPinkMountain,
//     imageAlt:
//       "Pink women's T-shirt with a custom mountain graphic",
//     featured: true,
//     tone: "blush",
//     label: "Women's fit",
//   },
//   {
//     slug: "hoodies",
//     name: "Hoodies",
//     blurb: "Heavyweight and everyday hoodies made for comfort.",
//     price: "From $18.99",
//     image: printBlackMountain,
//     imageAlt: "Custom printed hoodie",
//   },
//   {
//     slug: "sweatshirts",
//     name: "Sweatshirts",
//     blurb: "Classic crewnecks with soft, durable construction.",
//     price: "From $14.99",
//     image: printPinkMountain,
//     imageAlt: "Custom printed sweatshirt",
//   },
//   {
//     slug: "youth",
//     name: "Youth",
//     blurb: "Comfortable styles made for kids and growing teams.",
//     price: "From $4.49",
//     image: printBlackMountain,
//     imageAlt: "Custom printed youth T-shirt",
//   },
//   {
//     slug: "performance",
//     name: "Performance",
//     blurb: "Lightweight performance styles built for active wear.",
//     price: "From $7.99",
//     image: printPinkMountain,
//     imageAlt: "Custom printed performance shirt",
//   },
//   {
//     slug: "long-sleeve",
//     name: "Long Sleeve",
//     blurb: "Versatile long-sleeve styles for cooler days.",
//     price: "From $7.49",
//     image: printBlackMountain,
//     imageAlt: "Custom printed long-sleeve shirt",
//   },
//   {
//     slug: "jackets",
//     name: "Jackets",
//     blurb: "Layer-ready jackets for teams, events and everyday wear.",
//     price: "From $29.99",
//     image: printPinkMountain,
//     imageAlt: "Custom printed jacket",
//   },
// ];

export const categories = [
  {
    slug: "t-shirts",
    name: "T-Shirts",
    image: printBlackMountain,
    imageAlt:
      "Black custom T-shirt with a full-colour mountain graphic printed on the chest",
    featured: true,
    tone: "paper",
    label: "Most popular",
  },
  {
    slug: "womens",
    name: "Hoodies",
    image: printPinkMountain,
    imageAlt:
      "Pink women's T-shirt with a custom mountain graphic",
    featured: true,
    tone: "blush",
    label: "Women's fit",
  },
  {
    slug: "hoodies",
    name: "Hoodies",
    image: printBlackMountain,
    imageAlt: "Custom printed hoodie",
  },
  {
    slug: "sweatshirts",
    name: "Sweatshirts",
    image: printPinkMountain,
    imageAlt: "Custom printed sweatshirt",
  },
  {
    slug: "youth",
    name: "Youth",
    image: printBlackMountain,
    imageAlt: "Custom printed youth T-shirt",
  },
  {
    slug: "performance",
    name: "Performance",
    image: printPinkMountain,
    imageAlt: "Custom printed performance shirt",
  },
  {
    slug: "long-sleeve",
    name: "Long Sleeve",
    image: printBlackMountain,
    imageAlt: "Custom printed long-sleeve shirt",
  },
  {
    slug: "jackets",
    name: "Jackets",
    image: printPinkMountain,
    imageAlt: "Custom printed jacket",
  },
];



// export const brands = [
//   { name: "Northwind Outfitters", style: "serif" },
//   { name: "Lakeside Academy", style: "caps" },
//   { name: "Foundry Fitness", style: "bold" },
//   { name: "Harbor & Vale", style: "serif" },
//   { name: "Redline Motorsport", style: "italic" },
//   { name: "Summit Robotics", style: "mono" },
//   { name: "Bluebird Bakery", style: "script" },
//   { name: "Atlas Youth League", style: "caps" },
//   { name: "Pinecrest Church", style: "serif" },
//   { name: "Volt Esports", style: "bold" },
// ];

export const brandLogos = [
  { src: logo1, alt: "Brand logo 1" },
  { src: logo2, alt: "Brand logo 2" },
  { src: logo1, alt: "Brand logo 1" },
  { src: logo2, alt: "Brand logo 2" },
  { src: logo1, alt: "Brand logo 1" },
  { src: logo2, alt: "Brand logo 2" },
  { src: logo1, alt: "Brand logo 1" },
  { src: logo2, alt: "Brand logo 2" },
  { src: logo1, alt: "Brand logo 1" },
  { src: logo2, alt: "Brand logo 2" },
];


export const gallery = [
  {
    image: printCreamMountain,
    alt: "Cream T-shirt printed with a retro mountain adventure graphic",
    title: "Trailhead Collective",
    meta: "120 tees · Screen print",
    tone: "sand",
    size: "tall",
  },
  {
    image: printBlackMountain,
    alt: "Sky blue T-shirt printed with a camping badge",
    title: "Camp Always Wild",
    meta: "64 tees · DTG",
    tone: "sky",
  },
  {
    image: printBlackMountain,
    alt: "Black T-shirt printed with a purple skull graphic",
    title: "Demon Tapstitch",
    meta: "300 tees · Screen print",
    tone: "ink",
    size: "wide",
  },
  {
    image: printWhiteGarage,
    alt: "White T-shirt printed with a motorcycle garage badge",
    title: "Motorcycle Garage '98",
    meta: "48 tees · DTG",
    tone: "paper",
  },
  {
    image: printCreamMountain,
    alt: "Navy T-shirt printed with a motorcycle garage badge",
    title: "Garage Crew Edition",
    meta: "24 tees · Embroidery",
    tone: "navy",
  },
  {
    image: printCreamMountain,
    alt: "Grey T-shirt printed with a camping badge",
    title: "Scout Troop 212",
    meta: "80 tees · Screen print",
    tone: "stone",
    size: "tall",
  },
];

export const testimonials = {
  rating: 4.9,
  count: "18,412",
  featured: {
    quote:
      "We've ordered from three other printers before ooShirts. This is the first time the colours matched the mockup, the shirts arrived early, and nobody on the team asked to swap sizes. That's the whole review.",
    name: "Dana Whitfield",
    role: "Operations lead, Summit Robotics",
    rating: 5,
  },
  items: [
    {
      quote: "The free design review caught a low-res logo before printing. Saved us from 200 blurry shirts.",
      name: "Marcus Lee",
      role: "Coach, Atlas Youth League",
      rating: 5,
    },
    {
      quote: "Transparent pricing, no surprise fees at checkout, and support actually picked up the phone.",
      name: "Priya Raman",
      role: "Founder, Bluebird Bakery",
      rating: 5,
    },
    {
      quote: "Softest blanks we've had for a staff order. Half the team asked where they could buy more.",
      name: "Jordan Alvarez",
      role: "People team, Foundry Fitness",
      rating: 4.5,
    },
  ],
};

export const whyUs = {
  stats: [
    { value: "10M+", label: "Shirts printed since 2009" },
    { value: "4.9", label: "Average rating across 18k reviews" },
    { value: "48h", label: "Fastest rush turnaround" },
    { value: "100%", label: "Reprint or refund guarantee" },
  ],
  reasons: [
    {
      icon: FiEye,
      title: "Free design review on every order",
      text: "A print specialist checks resolution, colour separation and placement before anything goes to press — and tells you if something won't print well.",
    },
    {
      icon: FiZap,
      title: "Fast production, without the rush fee culture",
      text: "Standard orders leave our floor in 3 business days. Need it sooner? Rush and super-rush options are clearly priced up front.",
    },
    {
      icon: FiPackage,
      title: "Reliable, tracked delivery",
      text: "Free ground shipping on every order, tracking the moment it ships, and a guaranteed delivery date you can plan events around.",
    },
    {
      icon: FiShield,
      title: "Transparent pricing you can calculate yourself",
      text: "Quantity tiers, print locations and ink colours are all shown live. No setup fees, no artwork fees, no surprises at checkout.",
    },
  ],
};

export const steps = [
  {
    number: "01",
    title: "Choose your product",
    text: "Pick from tees, hoodies, performance wear and more. Filter by fit, fabric weight and budget — we'll show live pricing as you go.",
    icon: GiTShirt,
    image: teeBlack,
    imageAlt: "Blank black T-shirt ready to be customised",
  },
  {
    number: "02",
    title: "Create your design",
    text: "Upload artwork or build it in our free design studio. Add text, clipart and colours, then preview it on every side of the garment.",
    icon: FiPenTool,
    image: printBlackMountain,
    imageAlt: "Black T-shirt shown with a custom mountain graphic applied",
  },
  {
    number: "03",
    title: "Receive your order",
    text: "Approve the free design review, relax, and track your order to the door. Standard shipping is always free.",
    icon: FiCheckCircle,
    image: teeBlackBack,
    imageAlt: "Back view of a finished black T-shirt, folded and ready to ship",
  },
];

export const faqs = [
  {
    q: "What is the minimum order quantity?",
    a: "Screen printing starts at 12 pieces per design. Direct-to-garment (DTG) and embroidery have no minimum — you can order a single shirt.",
  },
  {
    q: "How quickly will I receive my shirts?",
    a: "Standard production is 3 business days plus free ground shipping (2–5 days). Rush (48h) and Super Rush (24h) production options are available at checkout with guaranteed delivery dates.",
  },
  {
    q: "What file types can I upload?",
    a: "PNG, JPG, SVG, PDF, AI and PSD. For the sharpest results we recommend vector files or 300 DPI images at print size. Our free design review will flag anything that won't print well.",
  },
  {
    q: "Are there setup or artwork fees?",
    a: "No. The price you see in the designer includes screens, setup and a professional artwork check. Shipping is free on every order.",
  },
  {
    q: "Can I see a proof before you print?",
    a: "Yes. Every order includes a digital proof from our design team. Nothing goes to press until you approve it.",
  },
  {
    q: "What if something is wrong with my order?",
    a: "If we made a mistake — wrong colour, misprint, missing item — we reprint it or refund you in full. Just send a photo within 15 days of delivery.",
  },
];

export const pricing = {
  tiers: [
    { qty: "12–49", price: "$9.49", note: "1-colour front print" },
    { qty: "50–149", price: "$6.99", note: "Most popular for teams" },
    { qty: "150–499", price: "$4.99", note: "Events & merch" },
    { qty: "500+", price: "Custom", note: "Dedicated account rep" },
  ],
  includes: ["No setup or artwork fees", "Free ground shipping", "Free digital proof", "Reprint or refund guarantee"],
};

export const support = [
  { icon: FiMessageCircle, title: "Live chat", text: "Average reply under 2 minutes.", action: "Start a chat", href: "#chat" },
  { icon: FiMail, title: "Email", text: site.email, action: "Send an email", href: `mailto:${site.email}` },
  { icon: FiPhone, title: "Phone", text: `${site.phone} · ${site.hours}`, action: "Call us", href: `tel:${site.phone.replace(/[^0-9]/g, "")}` },
];

export const footer = {
  blurb: "Custom T-shirts, hoodies and team apparel printed in the USA and shipped free. Trusted by schools, startups and 50,000+ teams.",
  columns: [
    {
      title: "Products",
      links: ["T-Shirts", "Hoodies", "Sweatshirts", "Youth", "Performance", "Long Sleeve", "Women's Apparel", "Jackets"],
    },
    {
      title: "Company",
      links: ["About us", "Reviews", "Sustainability", "Careers", "Press", "Blog"],
    },
    {
      title: "Support",
      links: ["Help center", "Order status", "Shipping & delivery", "Returns & reprints", "Design guidelines", "Contact"],
    },
  ],
  legal: ["Privacy", "Terms", "Accessibility"],
};
