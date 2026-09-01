import ProductList from "@/features/products/components/ProductList";

export default function HomePage() {
  return (
    <section>
      <div className="page-heading">
        <h1>Products</h1>
        <p className="muted">
          Data is loaded, cached and invalidated through RTK Query. Search,
          filters and pagination are all query parameters.
        </p>
      </div>
      <ProductList />
    </section>
  );
}
