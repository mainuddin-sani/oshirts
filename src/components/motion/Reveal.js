"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.2, 0.7, 0.2, 1];

const VARIANTS = {
  fade: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  image: {
    hidden: { opacity: 0, clipPath: "inset(0 0 12% 0 round 16px)", scale: 1.04 },
    show: { opacity: 1, clipPath: "inset(0 0 0% 0 round 16px)", scale: 1 },
  },
  none: {
    hidden: { opacity: 1 },
    show: { opacity: 1 },
  },
};

/**
 * Scroll-triggered reveal. Renders `as` (default div) via framer-motion.
 * Respects prefers-reduced-motion by rendering content statically.
 */
export default function Reveal({
  as = "div",
  variant = "fade",
  delay = 0,
  duration = 0.65,
  once = true,
  amount = 0.15,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] || motion.div;
  const v = reduce ? VARIANTS.none : VARIANTS[variant] || VARIANTS.fade;

  return (
    <Component
      initial="hidden"
      whileInView="show"
      // Small margin so content starts revealing a touch before it's fully
      // on-screen rather than right at the viewport edge.
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      variants={v}
      transition={{ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}
