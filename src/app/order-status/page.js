import OrderStatus from "@/components/order/OrderStatus/OrderStatus";

export const metadata = {
  title: "Check your order status — Shirts",
  description:
    "Track a custom apparel order with your order number and billing ZIP code — see proof, production, shipping and delivery progress at a glance.",
};

export default function OrderStatusPage() {
  return <OrderStatus />;
}
