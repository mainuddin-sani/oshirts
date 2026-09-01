"use client";

import { normalizeApiError } from "@/utils/apiError";

export default function ErrorMessage({ error, title = "Request failed", onRetry }) {
  const { status, message } = normalizeApiError(error);

  return (
    <div className="alert alert--error" role="alert">
      <div>
        <strong>{title}</strong>
        {status ? <span className="alert__status"> · {status}</span> : null}
        <p>{message}</p>
      </div>
      {onRetry ? (
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          Retry
        </button>
      ) : null}
    </div>
  );
}
