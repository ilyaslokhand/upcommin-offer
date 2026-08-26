import Link from "next/link";
import { getCategories, getStores } from "@/lib/graphql/queries/taxonomies";
import { getBlogCategories } from "@/lib/graphql/queries/taxonomies";
import HeaderNav from "./HeaderNav";
import Image from 'next/image'


export default async function Header() {
  const [categories, stores, blogCats] = await Promise.all([
    getCategories(),
    getStores(),
    getBlogCategories(),
  ]);


  return (
    <header className="bg-surface w-full sticky top-0 z-50" style={{ boxShadow: "0px 2px 10px rgba(0,0,0,0.06)" }}>
      <div className="container-wrap flex items-center justify-between py-3 ">
        {/* Logo */}
        <Link href="/" className="inline-block">
      <Image 
        src="/upcomingofferblack@2x.png" 
        alt="UpcomingOffer Logo" 
        width={160} 
        height={40} 
        className="h-10 w-auto object-contain object-left" 
        priority
      />
    </Link>

        <HeaderNav categories={categories} stores={stores} blogCats={blogCats} />
      </div>
    </header>
  );
}