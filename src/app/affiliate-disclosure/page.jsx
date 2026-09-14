import { getPageBySlug } from "@/lib/graphql/queries/pages";
import Breadcrumb from "@/components/common/Breadcrumb";
import { notFound } from "next/navigation";

export default async function DisclosurePage() {
    const page = await getPageBySlug("affiliate-disclosure");   // your WP slug
    if (!page) notFound();

    return (
        <div>
            <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: page.title },
            ]} />

            <div className="container-wrap py-6">
                <div className=" mx-auto w-full">
                    <h1 className="font-bold tracking-[-0.56px] text-text mb-5" style={{ fontFamily: "var(--font-display)" }}>
                        {page.title}
                    </h1>
                    <div className="page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
            </div>
        </div>
    );
}