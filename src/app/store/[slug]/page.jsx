import { getCategories, getStoreBySlug } from "@/lib/graphql/queries/taxonomies";
import StoreHero from "@/components/common/StoreHero";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import DealListing from "@/components/deal/DealListing";

const STORE_TABS = [
    { label: "Deals", value: "" },   // "" = all deals (no tag filter)
];

export default async function StorePage({ params }) {
    const { slug } = await params;

    const [store, categories] = await Promise.all([
        getStoreBySlug(slug),
        getCategories(),   // top-level categories for the sidebar
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
            />
            {/* SEO description + FAQs at bottom (later) */}
        </div>
    );
}