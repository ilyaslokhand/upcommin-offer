import { getDealBySlug, getStoreDeals } from "@/lib/graphql/queries/deals";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import DealHero from "@/components/deal/DealHero";
import DealContent from "@/components/deal/DealContent";
import HowToGet from "@/components/deal/HowToGet";
import SidebarDeals from "@/components/deal/SidebarDeals";
import LootBand from "@/components/common/LootBand";
import Comments from "@/components/common/Comments";



// helper to pull a term by taxonomy
function getTerm(terms, tax) {
    return terms?.nodes?.find((t) => t.taxonomyName === tax);
}

export default async function DealPage({ params }) {
    const { slug } = await params;
    const deal = await getDealBySlug(slug);
    if (!deal && slug) notFound();

    const store = getTerm(deal.terms, "store");
    const category = getTerm(deal.terms, "deal-category");

    const storeDeals = store
        ? (await getStoreDeals(store.slug, 10)).filter((d) => d.slug !== deal.slug)
        : [];

    return (
        <div>
            {/* Breadcrumb */}
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                ...(store ? [{ label: store.name, href: `/store/${store.slug}` }] : []),
                ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
                { label: deal.title },
            ]} />

            {/* Main layout */}
            <div className="container-wrap py-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">
                {/* Main column */}
                <div className="flex flex-col gap-6 min-w-0">
                    <div className="bg-white border border-line rounded-[16px] p-6">
                        <DealHero deal={deal} />
                    </div>

                    <DealContent title="Product Description" html={deal.productDescription} />

                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-6">
                        <HowToGet storeName={store?.name} affiliateLink={deal.affiliateLink} />
                        <DealContent title="More about this deal" html={deal.moreAbout} />
                    </div>

                    {/* Comments — DESKTOP only (in main column) */}
                    <div className="hidden lg:block bg-white p-6 border border-line rounded-[16px]">
                        <Comments contentId={deal.databaseId} initialCount={deal.commentCount} />
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="flex flex-col gap-4">
                    <div className="bg-white border border-line rounded-[12px] p-4">
                        <SidebarDeals deals={storeDeals} storeName={store?.name} storeSlug={store?.slug} />
                    </div>
                    <LootBand />
                </aside>
            </div>

            {/* Comments — MOBILE only (after everything, last) */}
            <div className="container-wrap pb-8">
                <div className=" lg:hidden bg-white p-6 border border-line rounded-[16px]">
                    <Comments contentId={deal.databaseId} initialCount={deal.commentCount} />
                </div>
            </div>
        </div>
    );
}