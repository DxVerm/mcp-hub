import { Hero, FeaturedServers, CategoryGrid, QuickStart } from "@/components/home";
import { getFeaturedServers, getCategoriesWithCounts } from "@/lib/data";

export default function HomePage() {
  const featuredServers = getFeaturedServers();
  const categories = getCategoriesWithCounts();

  return (
    <>
      <Hero />
      <FeaturedServers servers={featuredServers} />
      <CategoryGrid categories={categories} />
      <QuickStart />
    </>
  );
}
