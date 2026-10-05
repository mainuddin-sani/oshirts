import { CheckoutProvider } from "@/components/checkout/CheckoutContext";
import CheckoutShell from "@/components/checkout/CheckoutShell";

export const metadata = {
  title: "Checkout — Shirts",
  description: "Review your custom apparel order, add print instructions, choose delivery and pay securely.",
};

export default function CheckoutLayout({ children }) {
  return (
    <CheckoutProvider>
      <CheckoutShell>{children}</CheckoutShell>
    </CheckoutProvider>
  );
}
