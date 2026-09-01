import FAQ from "@/components/common/FAQ";
import LatestBlog from "@/components/common/LatestBlog";
import CommunityBand from "@/components/common/CommunityBand";
import SaleBanners from "./sale/[slug]/SaleBanners";
import TrustBar from "@/components/common/TrustBar";
import CategoryChips from "@/components/common/CategoryChips";
import TrendingStores from "@/components/common/TrendingStores";
import DealsGrid from "@/components/deal/DealsOfDayCarousel";
import DealsOfDayCarousel from "@/components/deal/DealsOfDayCarousel";
import DealsOfDay from "@/components/deal/DealsOfDay";
import LatestDealsClient from "@/components/deal/LatestDealsClient";
import LatestDeals from "@/components/deal/LatestDeals";

export default async function HomePage() {

  return (
    <main > 
      <SaleBanners />
      <TrustBar />
      <CategoryChips />
      <DealsOfDay />
      <LatestDeals/>
      <TrendingStores />
      <CommunityBand/>
      <LatestBlog />
      <FAQ />
    </main>
  );
}