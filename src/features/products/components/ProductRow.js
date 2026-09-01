"use client";

import Link from "next/link";
import { formatPrice } from "@/utils/format";

export default function ProductRow({ product, onEdit, onDelete, isDeleting }) {
  return (
    <tr className={isDeleting ? "row--busy" : ""}>
      <td>
        <Link href={`/products/${product.id}`} className="link">
          {product.name}
        </Link>
        <div className="muted small">#{product.id}</div>
      </td>
      <td>{product.category}</td>
      <td>{formatPrice(product.price)}</td>
      <td>{product.stock}</td>
      <td>
        <span className={`badge badge--${product.status}`}>{product.status}</span>
      </td>
      <td className="actions">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => onEdit(product)} disabled={isDeleting}>
          Edit
        </button>
        <button type="button" className="btn btn--danger btn--sm" onClick={() => onDelete(product)} disabled={isDeleting}>
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </td>
    </tr>
  );
}
