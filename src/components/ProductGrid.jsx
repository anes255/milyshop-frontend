import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], cols = 4 }) {
  const grid = {
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols] || "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <div className={`grid grid-cols-2 ${grid} gap-4 md:gap-6`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
