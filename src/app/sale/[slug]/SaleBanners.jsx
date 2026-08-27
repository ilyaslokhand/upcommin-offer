import { getAllSales } from "@/lib/graphql/queries/sales";
import SaleCarousel from "./SaleCarousel";

export default async function SaleBanners() {
  const sales = (await getAllSales()).slice(0, 4); // show up to 8 in the carousel
  if (!sales.length) return null;

  return (
    <section className="container-wrap pt-6">
      <SaleCarousel sales={sales} />
    </section>
  );
}