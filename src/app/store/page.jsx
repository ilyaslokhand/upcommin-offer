import { getStores } from "@/lib/graphql/queries/taxonomies";
import Breadcrumb from "@/components/common/Breadcrumb";
import StoreGrid from "@/components/common/StoreGrid";

export default async function StoresPage() {
  const stores = await getStores({ first: 100 });

  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Stores" }]} />

      <div className="container-wrap pt-4">
        <h1 className="font-bold tracking-[-0.56px] text-text" style={{ fontFamily: "var(--font-display)" }}>
          Top Stores
        </h1>
      </div>

      <div className="container-wrap py-6">
        <StoreGrid stores={stores} columns={6} />
      </div>
    </div>
  );
}