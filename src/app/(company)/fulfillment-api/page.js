import FulfillmentApi from "@/components/Company/about/FulfillmentApi";

export const metadata = {
  title: "Fulfillment API — Shirts",
  description:
    "Print and ship on demand from your own storefront: create orders over REST, get proofs, tracking and webhook events with no inventory or minimums.",
};

export default function FulfillmentApiPage() {
  return <FulfillmentApi />;
}
