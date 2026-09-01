"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/features/products/productApi";
import { PAGINATION, PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { normalizeApiError } from "@/utils/apiError";
import Spinner from "@/components/ui/Spinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import ProductRow from "./ProductRow";
import ProductForm from "./ProductForm";

export default function ProductList() {
  const [page, setPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [limit, setLimit] = useState(PAGINATION.DEFAULT_LIMIT);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState(null);
  const [actionError, setActionError] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  // Every filter lives in the query args: changing any of them triggers a new
  // (cached) request automatically. No manual fetching anywhere.
  const queryArgs = {
    page,
    limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(category && { category }),
    ...(status && { status }),
  };

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetProductsQuery(queryArgs);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting, originalArgs: deletingId }] =
    useDeleteProductMutation();

  // Changing any filter starts back on page 1.
  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(PAGINATION.DEFAULT_PAGE);
  };
  const changeSearch = withPageReset(setSearch);
  const changeCategory = withPageReset(setCategory);
  const changeStatus = withPageReset(setStatus);
  const changeLimit = withPageReset(setLimit);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setPage(PAGINATION.DEFAULT_PAGE);
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    setActionError(null);
    try {
      await deleteProduct(product.id).unwrap();
      // If we just removed the only item on this page, step back one page;
      // the invalidated LIST tag triggers the refetch for the new args.
      if (data?.data?.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (err) {
      setActionError(err);
    }
  };

  const handleUpdate = async (values) => {
    await updateProduct({ id: editing.id, ...values }).unwrap();
    setEditing(null);
  };

  const products = data?.data ?? [];
  const meta = data?.meta;
  const hasFilters = Boolean(debouncedSearch || category || status);

  return (
    <div className="stack">
      <div className="toolbar card">
        <input
          type="search"
          className="toolbar__search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
          aria-label="Search products"
        />
        <select value={category} onChange={(e) => changeCategory(e.target.value)} aria-label="Category">
          <option value="">All categories</option>
          {PRODUCT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => changeStatus(e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {PRODUCT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={limit} onChange={(e) => changeLimit(Number(e.target.value))} aria-label="Per page">
          {PAGINATION.LIMIT_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
        <button type="button" className="btn btn--ghost" onClick={refetch} disabled={isFetching}>
          {isFetching && !isLoading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {actionError ? (
        <div className="alert alert--error" role="alert">
          <p>{normalizeApiError(actionError).message}</p>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => setActionError(null)}>
            Dismiss
          </button>
        </div>
      ) : null}

      {editing ? (
        <div className="card">
          <h2 className="card__title">Edit “{editing.name}”</h2>
          <ProductForm
            key={editing.id}
            initialValues={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            isSubmitting={isUpdating}
            submitLabel="Save changes"
          />
        </div>
      ) : null}

      {isLoading ? (
        <div className="card">
          <Spinner label="Loading products…" />
        </div>
      ) : isError ? (
        <ErrorMessage error={error} title="Couldn't load products" onRetry={refetch} />
      ) : products.length === 0 ? (
        <EmptyState
          title={hasFilters ? "No products match your filters" : "No products yet"}
          description={
            hasFilters
              ? "Try clearing the search or choosing a different category/status."
              : "Create your first product to get started."
          }
          action={
            hasFilters ? (
              <button type="button" className="btn btn--ghost" onClick={clearFilters}>
                Clear filters
              </button>
            ) : (
              <Link href="/products/new" className="btn btn--primary">
                New product
              </Link>
            )
          }
        />
      ) : (
        <div className={`card table-wrap ${isFetching ? "is-fetching" : ""}`} aria-busy={isFetching}>
          <div className="table-meta muted small">
            {isFetching ? "Updating…" : `Showing ${products.length} of ${meta.total} products`}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                  isDeleting={isDeleting && deletingId === product.id}
                />
              ))}
            </tbody>
          </table>
          <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={setPage} disabled={isFetching} />
        </div>
      )}
    </div>
  );
}
