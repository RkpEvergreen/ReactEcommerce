import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FolderOpen,
    LogOut,
    Settings,
    Store,
    Eye,
    Search,
    PanelLeft,
    Sun,
    Bell,
    UserCircle
} from "lucide-react";

import "./AdminLayout.css";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    return (
        <div className="admin-layout">

            {/* Sidebar */}
            <aside className="admin-sidebar">

                <div className="admin-logo">
                    <span className="admin-logo-mark">S</span>
                    <span>SHOP.CO</span>
                </div>

                <nav className="admin-menu">
                    <span className="admin-menu-label">GENERAL</span>
                    <NavLink end to="/admin">
                        <LayoutDashboard size={17} />
                        <span>Dashboard</span>
                    </NavLink>

                    <span className="admin-menu-label">CATALOG</span>
                    <NavLink to="/admin/products">
                        <Package size={17} />
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/admin/categories">
                        <FolderOpen size={17} />
                        <span>Categories</span>
                    </NavLink>

                    <span className="admin-menu-label">SALES</span>
                    <NavLink to="/admin/orders">
                        <ShoppingCart size={17} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink to="/admin/customers">
                        <Users size={17} />
                        <span>Customers</span>
                    </NavLink>

                    <span className="admin-menu-label">SETTINGS</span>
                    <button type="button" className="admin-menu-link">
                        <Settings size={17} />
                        <span>Settings</span>
                    </button>
                    <button type="button" className="admin-menu-link">
                        <Store size={17} />
                        <span>Store customization</span>
                    </button>
                    <button type="button" className="admin-menu-link">
                        <Eye size={17} />
                        <span>View store</span>
                    </button>
                </nav>

                <div className="admin-logout">

                    <button type="button" onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}
            <main className="admin-main">

                <header className="admin-header">
                    <button type="button" className="admin-header-toggle" aria-label="Toggle sidebar">
                        <PanelLeft size={18} />
                    </button>
                    <div className="admin-header-actions">
                        <label className="admin-search">
                            <Search size={15} />
                            <input type="search" placeholder="Search" aria-label="Search admin" />
                            <kbd>⌘ K</kbd>
                        </label>
                        <button type="button" className="admin-header-icon" aria-label="Language">文</button>
                        <button type="button" className="admin-header-icon" aria-label="Theme">
                            <Sun size={17} />
                        </button>
                        <button type="button" className="admin-header-icon admin-notification" aria-label="Notifications">
                            <Bell size={17} />
                            <span />
                        </button>
                        <button type="button" className="admin-header-avatar" aria-label="Admin profile">
                            <UserCircle size={19} />
                        </button>
                    </div>

                </header>

                <div className="admin-content">
                    <Outlet />
                </div>

            </main>

        </div>
    );
}

export default AdminLayout;