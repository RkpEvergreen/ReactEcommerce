import Header from "../components/Header/Header";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Categories from "../components/Categories/Categories";
import ProductSection from "../components/ProductSection/ProductSection";
import FeaturedCategories from "../components/FeaturedCategories/FeaturedCategories";
import DealOfTheDay from "../components/DealOfTheDay/DealOfTheDay";
import Instagram from "../components/ShopInstagram/ShopInstagram";
import Benefits from "../components/Benefits/Benefits";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";

function Home() {
    return (
        <main>
             <Header />
            <HeroBanner />
            <Categories />
            <ProductSection />
            <FeaturedCategories />
            <DealOfTheDay />
            <Instagram />
            <Benefits />
            <Newsletter />
            <Footer />
        </main>
    );
}

export default Home;