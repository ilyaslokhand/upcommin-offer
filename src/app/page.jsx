import FAQ from "@/components/common/FAQ";
import LatestBlog from "@/components/common/LatestBlog";
import CommunityBand from "@/components/common/CommunityBand";
import SaleBanners from "./sale/[slug]/SaleBanners";
import TrustBar from "@/components/common/TrustBar";
import CategoryChips from "@/components/common/CategoryChips";

export default async function HomePage() {

  return (
    <main > 
      <SaleBanners />
      <TrustBar />
      <CategoryChips />
      <CommunityBand/>
      <LatestBlog />
      <FAQ />
    </main>
  );
}