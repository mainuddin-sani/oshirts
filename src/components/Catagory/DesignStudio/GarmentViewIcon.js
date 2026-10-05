import Image from "next/image";
import { GiTShirt } from "react-icons/gi";

import sleeveLeft from "@/assets/images/sleeve-left.webp";
import sleeveRight from "@/assets/images/sleeve-right.webp";

/**
 * Generic, colorless icon for the Front/Back/Left Sleeve/Right Sleeve view
 * switcher — these represent "which side you're looking at", not the
 * garment's actual color, matching the reference design's plain outline
 * icons rather than tinted product photos.
 */
export default function GarmentViewIcon({ viewId }) {
  if (viewId === "leftSleeve") {
    return <Image src={sleeveLeft} alt="" fill sizes="56px" />;
  }

  if (viewId === "rightSleeve") {
    return <Image src={sleeveRight} alt="" fill sizes="56px" />;
  }

  return <GiTShirt size="62%" aria-hidden="true" />;
}
