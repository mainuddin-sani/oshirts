import DesignStudio from "@/components/Catagory/DesignStudio/DesignStudio";

export default async function DesignStudioPage({ params, searchParams }) {
  const { category, productDetails } = await params;
  const query = await searchParams;

  return (
    <DesignStudio
      initialStyleId={query.style}
      initialColor={query.color}
      initialQuantity={query.qty}
      backHref={`/products/${category}/${productDetails}`}
    />
  );
}
