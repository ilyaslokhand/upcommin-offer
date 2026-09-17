import { getStoreCategories, getStoreBySlug } from "@/lib/graphql/queries/taxonomies";
import StoreHero from "@/components/common/StoreHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import DealListing from "@/components/deal/DealListing";
import StoreSeoSection from "@/components/common/StoreSeoSection";
import { getAllDeals } from "@/lib/graphql/queries/deals";
import { buildDealsWhere } from "@/lib/deals/buildDealsWhere";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const store = await getStoreBySlug(slug);

    if (!store) return {};

    return buildMetadata({
        seo: {
            title: store.rankMathTitle,
            description: store.rankMathDescription,
            canonicalUrl: store.rankMathCanonical,
        },
        title: store.name,
        path: `/store/${store.slug}`,
        type: "website",
    });
}

const STORE_TABS = [
    { label: "Deals", value: "" },   // "" = all deals (no tag filter)
];

export default async function StorePage({ params }) {
    const { slug } = await params;

    const storeDealsWhere = buildDealsWhere({
        store: slug,
    });

    const [
        store,
        categories,
        { deals: initialDeals, pageInfo: initialPageInfo },
    ] = await Promise.all([
        getStoreBySlug(slug),
        getStoreCategories(slug),
        getAllDeals({
            first: 20,
            after: null,
            where: storeDealsWhere,
        }),
    ]);

    if (!store || !store.slug) notFound();


    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Stores", href: "/store" },
                { label: store.name },
            ]} />

            <StoreHero
                name={store.name}
                description={store.description}
                count={store.count}
                logo={store.storeLogo}
                reward={store.storeReward}
            />


            <DealListing
                baseFilter={{ store: store.slug }}
                tabs={STORE_TABS}
                filterOptions={categories}
                filterLabel="Categories"
                filterParam="category"
                showFilter={true}
                showCoupons={true}
                initialDeals={initialDeals}
                initialPageInfo={initialPageInfo}
            />
            <StoreSeoSection
                seoDescription={store.seoDescription}
                faqs={store.faqs}
                storeName={store.name}
            />
        </div>
    );
}