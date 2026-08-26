import { getAllDeals } from "@/lib/graphql/queries/deals";
import { getAllSales } from "@/lib/graphql/queries/sales";
import { getDealsCount } from "@/lib/graphql/queries/deals";
import { getStoresCount } from "@/lib/graphql/queries/taxonomies";
import { getCategories } from "@/lib/graphql/queries/taxonomies";

export default async function HomePage() {
  const deals = await getAllDeals();
  const sales = await getAllSales();
  const dealsCount = await getDealsCount();
  const storesCount = await getStoresCount();
  const categories = await getCategories();

  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>UpcomingOffer</h1>

      {/* SALES / BANNERS */}
      <h2 style={{ marginTop: "24px" }}>Sales / Banners ({sales.length})</h2>
      {sales.map((sale) => (
        <div key={sale.id} style={{ border: "1px solid #4C34D4", borderRadius: "8px", padding: "12px", margin: "10px 0" }}>
          <strong>{sale.title}</strong> — {sale.saleHeading}<br />
          Status: {sale.saleStatus} | {sale.startDate} → {sale.endDate} | Store: {sale.saleStore}<br />
          {sale.featuredImage?.node?.sourceUrl
            ? <span style={{ color: "green" }}>✅ has image: {sale.featuredImage.node.sourceUrl}</span>
            : <span style={{ color: "red" }}>❌ no featured image</span>}
        </div>
      ))}

      {/* DEALS */}
      <h2 style={{ marginTop: "32px" }}>Deals ({deals.length})</h2>
      {deals.map((deal) => (
        <div key={deal.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "12px", margin: "10px 0", maxWidth: "400px" }}>
          {deal.featuredImage?.node?.sourceUrl && (
            <img src={deal.featuredImage.node.sourceUrl} alt={deal.title} style={{ width: "100%", borderRadius: "6px" }} />
          )}
          <h3>{deal.title}</h3>
          <p style={{ color: "green", fontWeight: "bold" }}>
            ₹{deal.price} <span style={{ color: "#999", textDecoration: "line-through" }}>₹{deal.originalPrice}</span> {deal.discountPercent}% off
          </p>
          <p style={{ marginTop: "20px" }}>
    Total deals: <strong>{dealsCount}</strong> · Total stores: <strong>{storesCount}</strong>
  </p>

  <h2 style={{ marginTop: "24px" }}>Categories ({categories.length})</h2>
  <div style={{ display: "flex", gap: "16px" }}>
    {categories.map((cat) => (
      <div key={cat.id} style={{ textAlign: "center" }}>
        {cat.categoryIcon && (
          <img src={cat.categoryIcon} alt={cat.name} style={{ width: "40px", height: "40px" }} />
        )}
        <div>{cat.name}</div>
      </div>
    ))}
  </div>
        </div>
      ))}
    </main>
  );
}