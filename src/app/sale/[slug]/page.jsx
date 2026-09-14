import { getSaleBySlug } from "@/lib/graphql/queries/sales";
import { getSaleCategories } from "@/lib/graphql/queries/taxonomies";
import SaleHero from "@/components/common/SaleHero";
import DealListing from "@/components/deal/DealListing";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";

export default async function SalePage({ params }) {
    const { slug } = await params;
    const [sale, categories] = await Promise.all([
        getSaleBySlug(slug),
        getSaleCategories(slug),
    ]);
    if (!sale || !sale.slug) notFound();

    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: sale.name },
            ]} />

            <SaleHero sale={sale} />

            <DealListing
                baseFilter={{ sale: sale.slug }}
                tabs={[{ label: "Latest", value: "daily-deal" }, { label: "Hot", value: "hot" }]}
                filterOptions={categories}
                filterLabel="Categories"
                filterParam="category"
                showFilter={true}
            />
        </div>
    );
}