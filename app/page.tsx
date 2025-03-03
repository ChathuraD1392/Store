import { getAllProducts } from "@/sanity/lib/client";
import Head from "next/head";
import SalesCampaignBanner from "./components/layouts/SalesCampaignBanner";
import ProductGrid from "./components/product/ProductGrid";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.jpg" sizes="180x180" />
      </Head>
      <div>
        <SalesCampaignBanner />

        <section className="container mx-auto py-8">
          <ProductGrid products={products} />
        </section>
      </div>
    </>
  );
};

export default Home;
