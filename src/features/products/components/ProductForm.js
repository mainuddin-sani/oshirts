"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from "@/constants";
import { normalizeApiError } from "@/utils/apiError";

const EMPTY = { name: "", category: "", price: "", stock: "", status: "active" };

/**
 * Presentational form used by both Create and Edit flows.
 * `onSubmit` must return a promise (the unwrapped RTK Query mutation);
 * any API error is normalized and rendered inline.
 */
export default function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = "Save",
}) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [apiError, setApiError] = useState(null);

  const { message, fieldErrors } = normalizeApiError(apiError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    try {
      await onSubmit(values);
    } catch (err) {
      setApiError(err);
    }
  };

  const field = (name, label, input) => (
    <label className={`field ${fieldErrors[name] ? "field--invalid" : ""}`}>
      <span className="field__label">{label}</span>
      {input}
      {fieldErrors[name] ? (
        <span className="field__error" role="alert">
          {fieldErrors[name]}
        </span>
      ) : null}
    </label>
  );

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {apiError ? (
        <div className="alert alert--error" role="alert">
          <p>{message}</p>
        </div>
      ) : null}

      {field(
        "name",
        "Name",
        <input name="name" value={values.name} onChange={handleChange} disabled={isSubmitting} />
      )}

      <div className="form__row">
        {field(
          "category",
          "Category",
          <select name="category" value={values.category} onChange={handleChange} disabled={isSubmitting}>
            <option value="">Select…</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        {field(
          "status",
          "Status",
          <select name="status" value={values.status} onChange={handleChange} disabled={isSubmitting}>
            {PRODUCT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="form__row">
        {field(
          "price",
          "Price (USD)",
          <input name="price" type="number" step="0.01" min="0" value={values.price} onChange={handleChange} disabled={isSubmitting} />
        )}
        {field(
          "stock",
          "Stock",
          <input name="stock" type="number" step="1" min="0" value={values.stock} onChange={handleChange} disabled={isSubmitting} />
        )}
      </div>

      <div className="form__actions">
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
        ) : null}
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
