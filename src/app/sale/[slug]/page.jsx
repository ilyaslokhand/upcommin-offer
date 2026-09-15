import { getSaleBySlug } from "@/lib/graphql/queries/sales";
import { getSaleCategories } from "@/lib/graphql/queries/taxonomies";
import SaleHero from "@/components/common/SaleHero";
import DealListing from "@/components/deal/DealListing";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SalePage({ params }) {
    const { slug } = await params;
    const [sale, categories] = await Promise.all([
        getSaleBySlug(slug),
        getSaleCategories(slug),
    ]);
    if (!sale || !sale.slug) notFound();
    const isEnded = sale.saleStatus === "ended";

    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: sale.name },
            ]} />

            <SaleHero sale={sale} />

            {isEnded ? (
                <section className="container-wrap py-6">
                    <div className="bg-white border border-line rounded-[16px] px-6 py-10 md:px-10 md:py-14 text-center">
                        <div className="max-w-[620px] mx-auto flex flex-col items-center">
                            <span className="inline-flex items-center rounded-full bg-[#f4f5f9] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-muted">
                                Sale ended
                            </span>

                            <h2
                                className="mt-4 text-text font-bold tracking-[-0.56px]"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                This sale has ended
                            </h2>

                            <p className="mt-2 text-[15px] leading-6 text-muted">
                                This sale is no longer available, but you can still find
                                fresh offers and discounts from your favourite stores.
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link
                                    href="/deals"
                                    className="w-full sm:w-auto bg-[#1c1c1c] text-white px-5 py-3 rounded-[8px] text-[14px] font-semibold hover:opacity-90 transition"
                                >
                                    View Latest Deals
                                </Link>

                                <Link
                                    href="/store"
                                    className="w-full sm:w-auto bg-white border border-line text-text px-5 py-3 rounded-[8px] text-[14px] font-semibold hover:border-brand transition"
                                >
                                    Browse Stores
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <DealListing
                    baseFilter={{ sale: sale.slug }}
                    tabs={[
                        { label: "Latest", value: "daily-deal" },
                        { label: "Hot", value: "hot" }
                    ]}
                    filterOptions={categories}
                    filterLabel="Categories"
                    filterParam="category"
                    showFilter={true}
                />
            )}
        </div>
    );
}