import Breadcrumb from "@/components/common/Breadcrumb";
import DealFeed from "@/components/deal/DealFeed";
import { getAllDeals } from "@/lib/graphql/queries/deals";

export default async function DealsPage() {
    const { deals, pageInfo } = await getAllDeals({
        first: 20,
    });

    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Deals" },
            ]} />

            <div className="container-wrap pt-4">
                <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
                    All Deals
                </h1>
            </div>

            <div className="container-wrap py-6">
                <DealFeed filters={{}} columns={4} initialDeals={deals}
                    initialPageInfo={pageInfo} />
            </div>
        </div>
    );
}