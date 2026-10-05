import {
  FiPenTool,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiLayers,
  FiRepeat,
  FiPackage,
} from "react-icons/fi";

import printBlackMountain from "@/assets/images/custom-hoodies.png";
import printCreamMountain from "@/assets/images/custom-sweatshirts.png";

export const signup = {
  eyebrow: "Create account",
  title: "Set up your print account in under a minute.",
  description:
    "Save designs, reorder in two clicks and track every job from proof to doorstep — with a print specialist on every order.",

  perks: [
    {
      icon: FiPenTool,
      title: "Free design review",
      text: "A specialist checks resolution and placement before we print.",
    },
    {
      icon: FiTruck,
      title: "Free shipping, always",
      text: "Every order ships free, with live tracking in your dashboard.",
    },
    {
      icon: FiShield,
      title: "Reprint or refund",
      text: "If the print misses the mockup, we make it right.",
    },
    {
      icon: FiHeadphones,
      title: "Real humans, fast",
      text: "Mon–Fri, 8am–8pm ET. Average reply under 12 minutes.",
    },
  ],

  stats: [
    { value: "10M+", label: "Shirts printed" },
    { value: "4.9", label: "Average rating" },
    { value: "48h", label: "Rush turnaround" },
  ],

  quote: {
    text:
      "Setting up the account took a minute and saved us hours. Every past order, size run and artwork file is right there when we reorder.",
    name: "Dana Whitfield",
    role: "Operations lead, Summit Robotics",
  },

  image: printBlackMountain,
};

export const login = {
  eyebrow: "Welcome back",
  title: "Pick up right where your last order left off.",
  description:
    "Your saved designs, size runs and artwork files are waiting — reorder a past job in two clicks or track one that is already on press.",

  highlights: [
    {
      icon: FiLayers,
      title: "Saved designs",
      text: "Every mockup you have approved, ready to edit or duplicate.",
    },
    {
      icon: FiRepeat,
      title: "Two-click reorder",
      text: "Same artwork, same size run, same price you paid last time.",
    },
    {
      icon: FiPackage,
      title: "Live order tracking",
      text: "Proof, print and shipping updates as they happen.",
    },
  ],

  // Illustrative snapshot of the dashboard the customer signs back into.
  orderPreview: {
    label: "Latest order",
    id: "#OS-48219",
    item: "120 × Premium Tee — Black",
    stage: "In print",
    eta: "Ships Thursday",
    steps: ["Proof", "Print", "Ship"],
    activeStep: 1,
  },

  rating: {
    value: "4.9",
    count: "18,412 reviews",
  },

  image: printCreamMountain,
};
