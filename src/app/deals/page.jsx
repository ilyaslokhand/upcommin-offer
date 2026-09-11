import Breadcrumb from "@/components/common/Breadcrumb";
import DealFeed from "@/components/deal/DealFeed";

export default function DealsPage() {
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
                <DealFeed filters={{}} columns={4} />
            </div>
        </div>
    );
}