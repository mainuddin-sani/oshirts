"use client";

import Link from "next/link";
import { useGetProductQuery } from "@/features/products/productApi";
import { formatDate, formatPrice } from "@/utils/format";
import { isStatus } from "@/utils/apiError";
import { HTTP_STATUS } from "@/constants";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyState from "@/components/ui/EmptyState";

export default function ProductDetail({ id }) {
  const { data: product, isLoading, isFetching, isError, error, refetch } =
    useGetProductQuery(id);

  if (isLoading) {
    return (
      <div className="card">
        <Spinner label="Loading product…" />
      </div>
    );
  }

  if (isError) {
    if (isStatus(error, HTTP_STATUS.NOT_FOUND)) {
      return (
        <EmptyState
          title="Product not found"
          description={`There is no product with id "${id}".`}
          action={
            <Link href="/" className="btn btn--primary">
              Back to products
            </Link>
          }
        />
      );
    }
    return <ErrorMessage error={error} title="Couldn't load product" onRetry={refetch} />;
  }

  if (!product) {
    return <EmptyState title="No product data" />;
  }

  return (
    <article className={`card ${isFetching ? "is-fetching" : ""}`} aria-busy={isFetching}>
      <Link href="/" className="link small">
        ← Back to products
      </Link>
      <div className="page-heading">
        <h1>{product.name}</h1>
        <span className={`badge badge--${product.status}`}>{product.status}</span>
      </div>
      <dl className="details">
        <div>
          <dt>ID</dt>
          <dd>#{product.id}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{product.category}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{formatPrice(product.price)}</dd>
        </div>
        <div>
          <dt>Stock</dt>
          <dd>{product.stock}</dd>
        </div>
        <div>
          <dt>Created</dt>
          <dd>{formatDate(product.createdAt)}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{formatDate(product.updatedAt)}</dd>
        </div>
      </dl>
      <button type="button" className="btn btn--ghost" onClick={refetch} disabled={isFetching}>
        {isFetching ? "Refreshing…" : "Refresh"}
      </button>
    </article>
  );
}
