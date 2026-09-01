import { NextResponse } from "next/server";
import { deleteProduct, getProduct, updateProduct, validateProduct } from "@/mocks/productsDb";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const notFound = (id) =>
  NextResponse.json({ message: `Product ${id} was not found.` }, { status: 404 });

export async function GET(_request, { params }) {
  const { id } = await params;
  await delay(300);
  const product = getProduct(id);
  if (!product) return notFound(id);
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Request body must be valid JSON." }, { status: 400 });
  }

  if (!getProduct(id)) return notFound(id);

  const errors = validateProduct(body, { partial: true });
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Validation failed.", errors }, { status: 422 });
  }

  await delay(300);
  return NextResponse.json(updateProduct(id, body));
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  await delay(300);
  const removed = deleteProduct(id);
  if (!removed) return notFound(id);
  return new NextResponse(null, { status: 204 });
}
