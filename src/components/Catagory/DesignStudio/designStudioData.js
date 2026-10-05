import teeBlack from "@/assets/images/tee-black.webp";
import teeBlackBack from "@/assets/images/tee-black-back.webp";
import teeWhite from "@/assets/images/tee-white.webp";
import teeCream from "@/assets/images/tee-cream.webp";
import teeGray from "@/assets/images/tee-gray.webp";
import teeSky from "@/assets/images/tee-sky.webp";
import teePink from "@/assets/images/tee-pink.webp";
import teeBlue from "@/assets/images/tee-blue.webp";
import teeBlueBack from "@/assets/images/tee-blue-back.webp";
import customHoodies from "@/assets/images/custom-hoodies.png";
import customSweatshirts from "@/assets/images/custom-sweatshirts.png";

export const MIN_QUANTITY = 24;

export const colorSwatches = {
  Black: "#111111",
  White: "#ffffff",
  "Sport Grey": "#9b9b9b",
  Gray: "#8b8b8b",
  Navy: "#26384d",
  Red: "#b93632",
  Cream: "#efe6d8",
  Sky: "#bcdcef",
  Pink: "#f3c6d6",
  "Royal Blue": "#1450c0",
};

export const shirtStyles = [
  {
    id: "hanes-hooded-sweatshirt",
    brand: "Hanes",
    name: "50/50 Hooded Sweatshirt",
    price: 19.23,
    image: customSweatshirts,
    category: "hoodie",
    colors: ["Black", "White", "Sport Grey", "Navy", "Red"],
    description:
      "Seamless collar, taped neck and shoulders. Double-needle sleeve and bottom hems, with a roomy front pocket.",
  },
  {
    id: "gildan-heavy-blend-zip",
    brand: "Gildan",
    name: "Heavy Blend Full-Zip Hooded Sweatshirt",
    price: 23.4,
    image: customHoodies,
    category: "hoodie",
    colors: ["Black", "White", "Navy", "Red"],
    description:
      "Full-zip hood with matching drawcord and air-jet spun yarn for a soft feel with less pilling.",
  },
  {
    id: "champion-reverse-weave",
    brand: "Champion",
    name: "Reverse Weave 12 oz. Pullover Hood",
    price: 50.21,
    image: customHoodies,
    category: "hoodie",
    colors: ["Black", "White", "Gray"],
    description:
      "Heavyweight reverse-weave construction resists shrinking, with a rib-knit hem that keeps its shape wash after wash.",
  },
  {
    id: "classic-cotton-tee",
    brand: "Gildan",
    name: "Classic Cotton Tee",
    price: 4.99,
    image: teeWhite,
    category: "tee",
    colors: ["Black", "White", "Royal Blue", "Cream", "Sky", "Pink"],
    description: "Seamless collar, taped neck and shoulders. Double-needle sleeve and bottom hems.",
  },
  {
    id: "heavyweight-tee",
    brand: "Next Level",
    name: "Heavyweight Ringspun Tee",
    price: 6.49,
    image: teeBlack,
    category: "tee",
    colors: ["Black", "Gray", "Navy"],
    description: "Combed ringspun cotton for a smooth print surface and a heavier, premium hand-feel.",
  },
  {
    id: "premium-tee",
    brand: "Bella + Canvas",
    name: "Premium Unisex Tee",
    price: 7.25,
    image: teeCream,
    category: "tee",
    colors: ["Cream", "White", "Sky", "Gray"],
    description: "Retail-fit tee with a soft, lightweight fabric that drapes well and holds crisp detail.",
  },
];

const teeColorImages = {
  Black: teeBlack,
  White: teeWhite,
  Cream: teeCream,
  Gray: teeGray,
  "Sport Grey": teeGray,
  Sky: teeSky,
  Pink: teePink,
  Navy: teeBlue,
};

const teeBackImages = {
  Black: teeBlackBack,
  Navy: teeBlueBack,
};

/** Real per-view mockup photos (front/back/left sleeve/right sleeve) for the
 * colors that have them, served straight out of /public. Takes priority over
 * the illustrated teeColorImages/teeBackImages placeholders below. */
const realTeePhotos = {
  White: {
    front: "/white/White-1-F.jpg",
    back: "/white/White-1-B.jpg",
    leftSleeve: "/white/White-1-L.jpg",
    rightSleeve: "/white/White-1-R.jpg",
  },
  "Royal Blue": {
    front: "/blue/Royal-Blue-1-F.jpg",
    back: "/blue/Royal-Blue-1-B.jpg",
    leftSleeve: "/blue/Royal-Blue-1-L.jpg",
    rightSleeve: "/blue/Royal-Blue-1-R.jpg",
  },
};

export const VIEWS = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "leftSleeve", label: "Left Sleeve" },
  { id: "rightSleeve", label: "Right Sleeve" },
];

/** Print area size (inches) and its on-canvas box, per view. Front/back share
 * the canvas's own 3:4 aspect ratio, so an equal width/height percentage keeps
 * a true 12"x16" box; the sleeve box is sized down to match a 3.5"x3.5" area
 * positioned over the sleeve fabric in the close-up mockup photos. */
export const PRINT_AREAS = {
  front: { width: 12, height: 16, top: 24, left: 23, boxWidth: 54, boxHeight: 54 },
  back: { width: 12, height: 16, top: 24, left: 23, boxWidth: 54, boxHeight: 54 },
  leftSleeve: { width: 3.5, height: 3.5, top: 18, left: 29, boxWidth: 42, boxHeight: 32 },
  rightSleeve: { width: 3.5, height: 3.5, top: 18, left: 29, boxWidth: 42, boxHeight: 32 },
};

export const STYLE_CATEGORIES = [
  { id: "all", label: "All Styles" },
  { id: "tee", label: "T-Shirts" },
  { id: "hoodie", label: "Hoodies" },
];

export const categoryLabel = (category) =>
  STYLE_CATEGORIES.find((entry) => entry.id === category)?.label || "Apparel";

export function findStyle(id) {
  return shirtStyles.find((style) => style.id === id) || shirtStyles[0];
}

/** The best mockup photo for a style + color + view. Tee styles in White or
 * Royal Blue get real front/back/sleeve photos; other tee colors only have an
 * illustrated front (and black/navy also a back), and both sleeve views fall
 * back to that same shot; everything else falls back to the style's default
 * image, matching this project's existing placeholder conventions rather
 * than inventing photography that doesn't exist. */
export function garmentImage(styleId, color, view = "front") {
  const style = findStyle(styleId);

  if (style.category === "tee" && realTeePhotos[color]?.[view]) {
    return realTeePhotos[color][view];
  }

  if (view === "back" && style.category === "tee" && teeBackImages[color]) {
    return teeBackImages[color];
  }

  if (style.category === "tee" && teeColorImages[color]) return teeColorImages[color];

  return style.image;
}

export function createGarment(overrides = {}) {
  const style = findStyle(overrides.styleId);
  const color = overrides.color && style.colors.includes(overrides.color) ? overrides.color : style.colors[0];

  return {
    styleId: style.id,
    color,
    quantity: Math.max(MIN_QUANTITY, Number(overrides.quantity) || MIN_QUANTITY),
  };
}

/* =========================================================
   TEXT TOOL
   ========================================================= */

export const TEXT_FONTS = [
  { id: "sans", label: "Sans Serif", family: "Arial, Helvetica, sans-serif" },
  { id: "serif", label: "Serif", family: "Georgia, 'Times New Roman', serif" },
  { id: "impact", label: "Bold Impact", family: "Impact, 'Arial Black', sans-serif" },
  { id: "mono", label: "Monospace", family: "'Courier New', monospace" },
  { id: "script", label: "Script", family: "'Brush Script MT', cursive" },
  { id: "comic", label: "Handwriting", family: "'Comic Sans MS', cursive" },
];

export const DEFAULT_INK_COLOR = "#111111";
export const DEFAULT_OUTLINE_COLOR = "#ffffff";

export const MIN_TEXT_SIZE = 14;
export const MAX_TEXT_SIZE = 96;
export const MAX_ARC = 100;

export const MIN_OUTLINE_WIDTH = 1;
export const MAX_OUTLINE_WIDTH = 6;

export function createTextElement(overrides = {}) {
  return {
    id: `text-${Math.random().toString(36).slice(2, 9)}`,
    type: "text",
    text: "Your text here",
    fontId: TEXT_FONTS[0].id,
    size: 32,
    color: DEFAULT_INK_COLOR,
    align: "center",
    spacing: 0,
    arc: 0,
    rotation: 0,
    outlineEnabled: false,
    outlineColor: DEFAULT_OUTLINE_COLOR,
    outlineWidth: 2,
    x: 50,
    y: 50,
    ...overrides,
  };
}

export function findFont(id) {
  return TEXT_FONTS.find((font) => font.id === id) || TEXT_FONTS[0];
}

/* =========================================================
   UPLOAD IMAGE TOOL
   ========================================================= */

export const UPLOAD_MAX_FILE_SIZE_MB = 25;

export const UPLOAD_ALLOWED_EXTENSIONS = [
  "gif",
  "jpg",
  "jpeg",
  "png",
  "bmp",
  "eps",
  "psd",
  "ps",
  "tiff",
  "tif",
  "pdf",
  "svg",
  "ai",
];

/** Formats this browser can actually decode and draw — the rest (eps, psd,
 * ps, tiff, pdf, ai) are accepted by print shops for the production file but
 * need server-side rasterization to preview, which this client-only tool
 * doesn't do. */
export const UPLOAD_PREVIEWABLE_TYPES = ["image/gif", "image/jpeg", "image/png", "image/bmp", "image/svg+xml"];

export const MIN_IMAGE_SIZE = 40;
export const MAX_IMAGE_SIZE = 400;

export function createImageElement(overrides = {}) {
  const naturalWidth = overrides.naturalWidth || 200;
  const naturalHeight = overrides.naturalHeight || 200;
  const width = Math.min(MAX_IMAGE_SIZE, Math.max(MIN_IMAGE_SIZE, naturalWidth));

  return {
    id: `image-${Math.random().toString(36).slice(2, 9)}`,
    type: "image",
    src: null,
    naturalWidth,
    naturalHeight,
    width,
    // height starts locked to the upload's own aspect ratio, but is stored
    // independently so it can be stretched out of ratio via the resize
    // handle or the width/height sliders.
    height: width * (naturalHeight / naturalWidth),
    rotation: 0,
    x: 50,
    y: 50,
    ...overrides,
  };
}

/** Moves an element within the stacking order — later entries render on top
 * since elements are painted in array order with no explicit z-index. */
export function reorderElements(elements, id, action) {
  const index = elements.findIndex((el) => el.id === id);
  if (index === -1) return elements;

  const next = [...elements];
  const [element] = next.splice(index, 1);

  if (action === "front") next.push(element);
  else if (action === "back") next.unshift(element);
  else if (action === "forward") next.splice(Math.min(index + 1, next.length), 0, element);
  else if (action === "backward") next.splice(Math.max(index - 1, 0), 0, element);
  else next.splice(index, 0, element);

  return next;
}
