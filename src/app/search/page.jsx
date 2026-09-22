import DealFeed from "@/components/deal/DealFeed";
import { getAllDeals } from "@/lib/graphql/queries/deals";
import {
    getStores,
    getCategories,
} from "@/lib/graphql/queries/taxonomies";
import { buildDealsWhere } from "@/lib/deals/buildDealsWhere";
import Breadcrumb from "@/components/common/Breadcrumb";

// Search result pages should not appear in Google search results.
export const metadata = {
    title: "Search Deals | UpcomingOffer",
    robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }) {
    // Read the keyword from /search?q=amazon.
    const params = await searchParams;
    const keyword =
        typeof params.q === "string"
            ? params.q.trim().slice(0, 100)
            : "";

    if (!keyword) {
        return (
            <main className="container-wrap py-10">
                <h1 className="font-bold text-text">Search deals</h1>
                <p className="mt-3 text-muted">Enter a keyword in the search box.</p>
            </main>
        );
    }

    // Get stores and categories at the same time.
    const [stores, categories] = await Promise.all([
        getStores({ first: 100 }),
        getCategories(),
    ]);

    // Match a store or category by its exact name or slug.
    const matchesKeyword = (item) =>
        item.name?.toLowerCase() === keyword.toLowerCase() ||
        item.slug?.toLowerCase() === keyword.toLowerCase();

    const matchedStore = stores.find(matchesKeyword);

    // Include each parent category and its subcategories.
    const allCategories = categories.flatMap((parent) => [
        parent,
        ...(parent.children?.nodes ?? []),
    ]);

    const matchedCategory = allCategories.find(matchesKeyword);

    // Store match first, then category match, then deal text search.
    const filters = matchedStore
        ? { store: matchedStore.slug }
        : matchedCategory
            ? { category: matchedCategory.slug }
            : { search: keyword };

    // Get the first 20 matching deals for the existing DealFeed.
    const { deals, pageInfo } = await getAllDeals({
        first: 20,
        where: buildDealsWhere(filters),
    });

    return (
        <>
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    { label: "Search results" },
                ]}
            />

            <main className="container-wrap py-8">
                <h1 className="font-bold tracking-[-0.56px] text-text">
                    Deals for “{keyword}”
                </h1>

                <div className="mt-6">
                    <DealFeed
                        key={keyword}
                        filters={filters}
                        columns={4}
                        initialDeals={deals}
                        initialPageInfo={pageInfo}
                    />
                </div>
            </main>
        </>
    );
}