import LegalPage from "@/components/legal/LegalPage";
import { terms } from "@/data/legal";

export const metadata = {
  title: "Terms & Conditions — Shirts",
  description:
    "The terms that govern every custom apparel order: proofs and approval, pricing, artwork rights, turnaround, reprints and refunds.",
};

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
