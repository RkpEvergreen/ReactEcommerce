import { Link } from "react-router-dom";
import {
    Menu,
    Search,
    ShoppingCart,
    UserRound
} from "lucide-react";

function MobileHeader() {
    return (
        <header className="mobile-header navbar navbar-light bg-white">
            <div className="container-fluid px-3">
                <button
                    type="button"
                    className="navbar-toggler border-0 p-0 mobile-menu-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mobileNavbar"
                    aria-controls="mobileNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <Menu size={24} />
                </button>

                <Link to="/" className="mobile-logo navbar-brand me-auto">
                    SHOP.CO
                </Link>

                <div className="mobile-actions d-flex align-items-center gap-3">
                    <Link to="/search" aria-label="Search" className="nav-link p-0">
                        <Search size={22} />
                    </Link>

                    <Link to="/cart" aria-label="Shopping cart" className="nav-link p-0">
                        <ShoppingCart size={22} />
                    </Link>

                    <Link to="/login" aria-label="Account" className="nav-link p-0">
                        <UserRound size={22} />
                    </Link>
                </div>
            </div>

            <div className="collapse navbar-collapse" id="mobileNavbar">
                <ul className="navbar-nav px-3 pb-3 pt-1">
                    <li className="nav-item">
                        <Link to="/products" className="nav-link">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products?category=sale" className="nav-link">On Sale</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/products?category=new" className="nav-link">New Arrivals</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/brands" className="nav-link">Brands</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default MobileHeader;