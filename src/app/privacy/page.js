import LegalPage from "@/components/legal/LegalPage";
import { privacy } from "@/data/legal";

export const metadata = {
  title: "Privacy Policy — Shirts",
  description:
    "What we collect when you order custom apparel, how it is used and shared, how long it is kept, and the choices you have.",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
