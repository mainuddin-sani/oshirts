import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Stars({ rating = 5, size = 14, label }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    if (rating >= value) return FaStar;
    if (rating >= value - 0.5) return FaStarHalfAlt;
    return FaRegStar;
  });

  return (
    <span
      role="img"
      aria-label={label || `${rating} out of 5 stars`}
      style={{ display: "inline-flex", gap: 2, color: "var(--ic-star)", lineHeight: 0 }}
    >
      {stars.map((Icon, i) => (
        <Icon key={i} size={size} aria-hidden="true" />
      ))}
    </span>
  );
}
