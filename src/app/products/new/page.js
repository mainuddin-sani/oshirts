import CreateProduct from "@/features/products/components/CreateProduct";

export default function NewProductPage() {
  return (
    <section>
      <div className="page-heading">
        <h1>New product</h1>
        <p className="muted">
          Submitting an empty form returns a 422 from the API so you can see
          field-level validation errors.
        </p>
      </div>
      <CreateProduct />
    </section>
  );
}
