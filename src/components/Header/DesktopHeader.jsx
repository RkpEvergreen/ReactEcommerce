import { Link } from "react-router-dom";
import { Search, ShoppingCart, UserRound, ChevronDown } from "lucide-react";

function DesktopHeader() {
    return (
        <header className="desktop-header">

            {/* Logo */}
            <Link to="/" className="shop-logo">
                SHOP.CO
            </Link>

            {/* Navigation */}
            <nav className="main-navigation">

                <Link to="/products" className="nav-link shop-link">
                    Shop
                    <ChevronDown size={14} />
                </Link>

                <Link to="/products?category=sale" className="nav-link">
                    On Sale
                </Link>

                <Link to="/products?category=new" className="nav-link">
                    New Arrivals
                </Link>

                <Link to="/brands" className="nav-link">
                    Brands
                </Link>

            </nav>

            {/* Search */}
            <div className="header-search">

                <Search size={20} />

                <input
                    type="text"
                    placeholder="Search for products..."
                />

            </div>

            {/* Actions */}
            <div className="header-actions">

                <Link to="/cart" aria-label="Shopping cart">
                    <ShoppingCart size={22} />
                </Link>

                <Link to="/login" aria-label="Account">
                    <UserRound size={22} />
                </Link>

            </div>

        </header>
    );
}

export default DesktopHeader;