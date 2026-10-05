import RetrieveDesigns from "@/components/designs/RetrieveDesigns/RetrieveDesigns";

export const metadata = {
  title: "Retrieve your saved designs — Shirts",
  description:
    "Enter the email address you designed with to pull up every design saved to it — then edit, share or send one straight to checkout.",
};

export default async function SavedDesignsPage({ searchParams }) {
  const query = await searchParams;

  return <RetrieveDesigns initialEmail={query?.email || ""} />;
}
