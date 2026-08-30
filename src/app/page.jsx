import FAQ from "@/components/common/FAQ";
import LatestBlog from "@/components/common/LatestBlog";
import CommunityBand from "@/components/common/CommunityBand";
import SaleBanners from "./sale/[slug]/SaleBanners";
import TrustBar from "@/components/common/TrustBar";
import CategoryChips from "@/components/common/CategoryChips";
import TrendingStores from "@/components/common/TrendingStores";

export default async function HomePage() {

  return (
    <main > 
      <SaleBanners />
      <TrustBar />
      <CategoryChips />
      <TrendingStores />
      <CommunityBand/>
      <LatestBlog />
      <FAQ />
    </main>
  );
}