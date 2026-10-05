import { FiCheckCircle, FiPenTool, FiPrinter, FiTruck, FiHome } from "react-icons/fi";

import { businessDaysFrom, formatDate, money, order } from "@/data/checkout";

/* =========================================================
   The five stages every print job moves through.
   ========================================================= */

export const stages = [
  {
    id: "placed",
    label: "Order placed",
    text: "Payment authorised and your job joined the queue.",
    icon: FiCheckCircle,
  },
  {
    id: "proof",
    label: "Proof approved",
    text: "A specialist checked the artwork and you signed it off.",
    icon: FiPenTool,
  },
  {
    id: "production",
    label: "In production",
    text: "On the press, then cured and quality checked.",
    icon: FiPrinter,
  },
  {
    id: "shipped",
    label: "Shipped",
    text: "Handed to the carrier with live tracking.",
    icon: FiTruck,
  },
  {
    id: "delivered",
    label: "Delivered",
    text: "Dropped at your shipping address.",
    icon: FiHome,
  },
];

const TONES = {
  placed: "accent",
  proof: "accent",
  production: "accent",
  shipped: "amber",
  delivered: "success",
};

/* =========================================================
   Demo records. A real build swaps lookupOrder for an API
   call — the shape it returns is all the UI depends on.
   ========================================================= */

const records = [
  {
    number: "OS-48219",
    zip: "78701",
    stageIndex: 2,
    placedDaysAgo: 4,
    quantity: 48,
    total: 1157.07,
    delivery: "Express",
    shipTo: "Austin, TX 78701",
    tracking: null,
  },
  {
    number: "OS-31640",
    zip: "97209",
    stageIndex: 3,
    placedDaysAgo: 9,
    quantity: 120,
    total: 2486.4,
    delivery: "Standard",
    shipTo: "Portland, OR 97209",
    tracking: "1Z999AA10123456784",
  },
  {
    number: "OS-20517",
    zip: "10011",
    stageIndex: 4,
    placedDaysAgo: 16,
    quantity: 24,
    total: 689.15,
    delivery: "Standard",
    shipTo: "New York, NY 10011",
    tracking: "1Z999AA10987654321",
  },
];

/** One sample pair surfaced in the UI so the page can be tried out. */
export const sampleLookup = { number: records[0].number, zip: records[0].zip };

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const normaliseNumber = (value = "") => {
  const trimmed = value.trim().toUpperCase().replace(/\s+/g, "");
  return /^\d+$/.test(trimmed) ? `OS-${trimmed}` : trimmed;
};

/**
 * Look an order up by number + billing ZIP. Returns null when nothing
 * matches, otherwise a fully resolved view model: the four summary facts and
 * a timeline where every stage is already marked done, current or upcoming.
 */
export function lookupOrder(number, zip) {
  const wanted = normaliseNumber(number);
  const wantedZip = (zip || "").trim().slice(0, 5);

  const record = records.find((entry) => entry.number === wanted && entry.zip === wantedZip);
  if (!record) return null;

  const now = new Date();
  const placedDate = addDays(now, -record.placedDaysAgo);
  const lastIndex = stages.length - 1;
  const isComplete = record.stageIndex === lastIndex;

  // Completed stages get the day they actually happened; everything after the
  // current stage is estimated forward in business days.
  const stepDays = Math.max(1, Math.floor(record.placedDaysAgo / Math.max(1, record.stageIndex)));

  const timeline = stages.map((stage, index) => {
    if (index < record.stageIndex) {
      return { ...stage, state: "done", date: formatDate(addDays(placedDate, index * stepDays)) };
    }

    if (index === record.stageIndex) {
      return {
        ...stage,
        state: isComplete ? "done" : "current",
        date: isComplete ? formatDate(addDays(placedDate, record.placedDaysAgo)) : "In progress",
      };
    }

    return {
      ...stage,
      state: "upcoming",
      date: `Est. ${formatDate(businessDaysFrom(index - record.stageIndex, now))}`,
    };
  });

  const deliveredDate = isComplete ? formatDate(addDays(placedDate, record.placedDaysAgo)) : null;
  const estimated = deliveredDate || formatDate(businessDaysFrom(lastIndex - record.stageIndex, now));

  return {
    number: record.number,
    orderDate: formatDate(placedDate),
    status: stages[record.stageIndex].label,
    statusText: stages[record.stageIndex].text,
    tone: TONES[stages[record.stageIndex].id],
    isComplete,
    estimated,
    estimatedLabel: isComplete ? "Delivered on" : "Estimated delivery",
    progress: Math.round((record.stageIndex / lastIndex) * 100),
    timeline,
    tracking: record.tracking,
    shipTo: record.shipTo,
    delivery: record.delivery,
    total: money(record.total),
    item: {
      name: order.name,
      brand: order.brand,
      color: order.color,
      image: order.frontImage,
      quantity: record.quantity,
    },
  };
}
