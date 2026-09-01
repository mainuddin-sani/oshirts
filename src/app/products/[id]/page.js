import ProductDetail from "@/features/products/components/ProductDetail";

export default async function ProductPage({ params }) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
