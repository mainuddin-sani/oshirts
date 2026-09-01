/**
 * In-memory product store used by the built-in mock API (src/app/api/**).
 * Persisted on globalThis so it survives Next.js hot reloads in dev.
 * Swap NEXT_PUBLIC_API_URL to point at a real backend and this is unused.
 */
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "@/constants";

const SEED = [
  { name: "Classic White Tee", category: "t-shirt", price: 19.99, stock: 120, status: "active" },
  { name: "Midnight Black Tee", category: "t-shirt", price: 21.5, stock: 80, status: "active" },
  { name: "Sunset Gradient Tee", category: "t-shirt", price: 24.0, stock: 0, status: "draft" },
  { name: "Heavyweight Hoodie", category: "hoodie", price: 49.0, stock: 35, status: "active" },
  { name: "Zip-Up Fleece Hoodie", category: "hoodie", price: 55.0, stock: 12, status: "active" },
  { name: "Vintage Wash Hoodie", category: "hoodie", price: 59.0, stock: 4, status: "archived" },
  { name: "Snapback Cap", category: "cap", price: 18.0, stock: 60, status: "active" },
  { name: "Dad Hat", category: "cap", price: 16.0, stock: 45, status: "draft" },
  { name: "Ceramic Logo Mug", category: "mug", price: 12.0, stock: 200, status: "active" },
  { name: "Enamel Camp Mug", category: "mug", price: 14.5, stock: 75, status: "active" },
  { name: "Limited Tie-Dye Tee", category: "t-shirt", price: 29.0, stock: 8, status: "active" },
  { name: "Cropped Hoodie", category: "hoodie", price: 45.0, stock: 20, status: "draft" },
];

function createDb() {
  let nextId = 1;
  const now = Date.now();
  const products = SEED.map((p, i) => ({
    id: String(nextId++),
    ...p,
    createdAt: new Date(now - (SEED.length - i) * 86400000).toISOString(),
    updatedAt: new Date(now - (SEED.length - i) * 86400000).toISOString(),
  }));
  return { products, nextId };
}

const globalKey = "__ooshirts_mock_db__";
const db = globalThis[globalKey] || (globalThis[globalKey] = createDb());

export function listProducts({ page = 1, limit = 10, search = "", category = "", status = "" }) {
  const q = search.trim().toLowerCase();
  let items = db.products;

  if (q) items = items.filter((p) => p.name.toLowerCase().includes(q));
  if (category) items = items.filter((p) => p.category === category);
  if (status) items = items.filter((p) => p.status === status);

  items = [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;

  return {
    data: items.slice(start, start + limit),
    meta: { page: safePage, limit, total, totalPages },
  };
}

export function getProduct(id) {
  return db.products.find((p) => p.id === String(id)) || null;
}

export function validateProduct(input, { partial = false } = {}) {
  const errors = {};
  const has = (k) => Object.prototype.hasOwnProperty.call(input, k);

  if (!partial || has("name")) {
    if (typeof input.name !== "string" || input.name.trim().length < 2) {
      errors.name = ["Name must be at least 2 characters."];
    }
  }
  if (!partial || has("category")) {
    if (!PRODUCT_CATEGORIES.includes(input.category)) {
      errors.category = [`Category must be one of: ${PRODUCT_CATEGORIES.join(", ")}.`];
    }
  }
  if (!partial || has("price")) {
    const price = Number(input.price);
    if (input.price === "" || input.price == null || Number.isNaN(price) || price < 0) {
      errors.price = ["Price must be a number greater than or equal to 0."];
    }
  }
  if (!partial || has("stock")) {
    const stock = Number(input.stock);
    if (input.stock === "" || input.stock == null || !Number.isInteger(stock) || stock < 0) {
      errors.stock = ["Stock must be a whole number greater than or equal to 0."];
    }
  }
  if (!partial || has("status")) {
    if (!PRODUCT_STATUSES.includes(input.status)) {
      errors.status = [`Status must be one of: ${PRODUCT_STATUSES.join(", ")}.`];
    }
  }
  return errors;
}

function sanitize(input) {
  const out = {};
  if ("name" in input) out.name = String(input.name).trim();
  if ("category" in input) out.category = input.category;
  if ("price" in input) out.price = Number(input.price);
  if ("stock" in input) out.stock = Number(input.stock);
  if ("status" in input) out.status = input.status;
  return out;
}

export function createProduct(input) {
  const product = {
    id: String(db.nextId++),
    ...sanitize(input),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.products.push(product);
  return product;
}

export function updateProduct(id, input) {
  const index = db.products.findIndex((p) => p.id === String(id));
  if (index === -1) return null;
  const updated = {
    ...db.products[index],
    ...sanitize(input),
    updatedAt: new Date().toISOString(),
  };
  db.products[index] = updated;
  return updated;
}

export function deleteProduct(id) {
  const index = db.products.findIndex((p) => p.id === String(id));
  if (index === -1) return false;
  db.products.splice(index, 1);
  return true;
}
