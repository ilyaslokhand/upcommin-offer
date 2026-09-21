import FAQ from "@/components/common/FAQ";
import LatestBlog from "@/components/common/LatestBlog";
import CommunityBand from "@/components/common/CommunityBand";
import SaleBanners from "./sale/[slug]/SaleBanners";
import TrustBar from "@/components/common/TrustBar";
import CategoryChips from "@/components/common/CategoryChips";
import TrendingStores from "@/components/common/TrendingStores";
import DealsOfDay from "@/components/deal/DealsOfDay";
import LatestDeals from "@/components/deal/LatestDeals";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "UpcomingOffer: Today's Best Deals & Coupons",
  description:
    "Discover verified deals, discount coupons and online shopping offers from Amazon, Flipkart, Myntra, Ajio and other popular stores in India.",
  path: "/",
  type: "website",
});

export default async function HomePage() {

  return (
    <main >
      <SaleBanners />
      <TrustBar />
      <CategoryChips />
      <DealsOfDay />
      <LatestDeals />
      <TrendingStores />
      <CommunityBand />
      <LatestBlog />
      <FAQ />
    </main>
  );
}