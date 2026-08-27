import { getAllDeals } from "@/lib/graphql/queries/deals";
import { getAllSales } from "@/lib/graphql/queries/sales";
import { getDealsCount } from "@/lib/graphql/queries/deals";
import { getStoresCount } from "@/lib/graphql/queries/taxonomies";
import { getCategories } from "@/lib/graphql/queries/taxonomies";
import FAQ from "@/components/common/FAQ";
import LatestBlog from "@/components/common/LatestBlog";
import CommunityBand from "@/components/common/CommunityBand";
import SaleBanners from "./sale/[slug]/SaleBanners";

export default async function HomePage() {
  const deals = await getAllDeals();
  const sales = await getAllSales();
  const dealsCount = await getDealsCount();
  const storesCount = await getStoresCount();
  const categories = await getCategories();

  return (
    <main > 
      <SaleBanners />
      <CommunityBand/>
      <LatestBlog />
      <FAQ />
    </main>
  );
}