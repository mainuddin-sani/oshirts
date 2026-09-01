"use client";

import { useRouter } from "next/navigation";
import { useCreateProductMutation } from "@/features/products/productApi";
import ProductForm from "./ProductForm";

export default function CreateProduct() {
  const router = useRouter();
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (values) => {
    // unwrap() rejects on API error so ProductForm can display it.
    await createProduct(values).unwrap();
    // The Product LIST tag is invalidated by the mutation, so the list
    // page refetches automatically — no manual reload needed.
    router.push("/");
  };

  return (
    <div className="card">
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/")}
        isSubmitting={isLoading}
        submitLabel="Create product"
      />
    </div>
  );
}
