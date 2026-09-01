import { NextResponse } from "next/server";
import { createProduct, listProducts, validateProduct } from "@/mocks/productsDb";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return NextResponse.json(
      { message: "Invalid pagination parameters. `page` >= 1 and 1 <= `limit` <= 100." },
      { status: 400 }
    );
  }

  // Simulated failure hook for testing error UI: ?fail=500 (or 401/403)
  const fail = searchParams.get("fail");
  if (fail) {
    const status = Number(fail) || 500;
    return NextResponse.json({ message: `Simulated ${status} error.` }, { status });
  }

  await delay(400); // make loading / fetching states visible

  const result = listProducts({
    page,
    limit,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    status: searchParams.get("status") || "",
  });

  return NextResponse.json(result);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Request body must be valid JSON." }, { status: 400 });
  }

  const errors = validateProduct(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Validation failed.", errors }, { status: 422 });
  }

  await delay(300);
  const product = createProduct(body);
  return NextResponse.json(product, { status: 201 });
}
