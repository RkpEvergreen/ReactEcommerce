import HeroBanner from "../components/HeroBanner/HeroBanner";
import Categories from "../components/Categories/Categories";
import ProductSection from "../components/ProductSection/ProductSection";
import FeaturedCategories from "../components/FeaturedCategories/FeaturedCategories";
import DealOfTheDay from "../components/DealOfTheDay/DealOfTheDay";
import Instagram from "../components/ShopInstagram/ShopInstagram";
import Benefits from "../components/Benefits/Benefits";
import Newsletter from "../components/Newsletter/Newsletter";

function Home() {
    return (
        <main>
            <HeroBanner />
            <Categories />
            <ProductSection />
            <FeaturedCategories />
            <DealOfTheDay />
            <Instagram />
            <Benefits />
            <Newsletter />
        </main>
    );
}

export default Home;