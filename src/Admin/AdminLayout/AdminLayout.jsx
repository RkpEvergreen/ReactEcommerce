import { Link, Outlet } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FolderOpen,
    LogOut
} from "lucide-react";

import "./AdminLayout.css";

function AdminLayout() {

    return (
        <div className="admin-layout">

            {/* Sidebar */}
            <aside className="admin-sidebar">

                <div className="admin-logo">
                    SHOP.CO
                </div>

                <nav className="admin-menu">

                    <Link to="/admin">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/admin/products">
                        <Package size={18} />
                        <span>Products</span>
                    </Link>

                    <Link to="/admin/categories">
                        <FolderOpen size={18} />
                        <span>Categories</span>
                    </Link>

                    <Link to="/admin/orders">
                        <ShoppingCart size={18} />
                        <span>Orders</span>
                    </Link>

                    <Link to="/admin/customers">
                        <Users size={18} />
                        <span>Customers</span>
                    </Link>

                </nav>

                <div className="admin-logout">

                    <button>
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}
            <main className="admin-main">

                <header className="admin-header">

                    <h2>Admin Panel</h2>

                    <span>
                        Admin
                    </span>

                </header>

                <div className="admin-content">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default AdminLayout;