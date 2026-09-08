import {
   BrowserRouter,
   Navigate,
   Outlet,
   Route,
   Routes
} from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AdminLayout from "./Admin/AdminLayout/AdminLayout";
import Dashboard from "./Admin/Dashboard/Dashboard";
import ProductList from "./Admin/Products/ProductList";
import AddProduct from "./Admin/Products/AddProduct";
import EditProduct from "./Admin/Products/EditProduct";
import CategoryList from "./Admin/Categories/CategoryList";
import AddCategory from "./Admin/Categories/AddCategory";
import EditCategory from "./Admin/Categories/EditCategory";
import OrderList from "./Admin/Orders/OrderList";
import OrderDetails from "./Admin/Orders/OrderDetails";
import CustomerList from "./Admin/Customers/CustomerList";

function ProtectedAdminRoute() {
   const { user } = useAuth();

   if (!user) {
       return <Navigate to="/login" replace />;
   }

   if (user.role !== "admin") {
       return <Navigate to="/" replace />;
   }

   return <Outlet />;
}

function App() {
   return (
       <AuthProvider>
           <BrowserRouter>
               <Header />

               <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/products" element={<Products />} />
                   <Route path="/products/:id" element={<ProductDetails />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/register" element={<Register />} />
                   <Route path="/cart" element={<Cart />} />
                   <Route path="/checkout" element={<Checkout />} />
                   <Route path="/orders" element={<Orders />} />

                   <Route path="/admin" element={<ProtectedAdminRoute />}>
                       <Route element={<AdminLayout />}>
                           <Route index element={<Dashboard />} />
                           <Route path="products" element={<ProductList />} />
                           <Route path="products/add" element={<AddProduct />} />
                           <Route path="products/edit/:id" element={<EditProduct />} />
                           <Route path="categories" element={<CategoryList />} />
                           <Route path="categories/add" element={<AddCategory />} />
                           <Route path="categories/edit/:id" element={<EditCategory />} />
                           <Route path="orders" element={<OrderList />} />
                           <Route path="orders/:id" element={<OrderDetails />} />
                           <Route path="customers" element={<CustomerList />} />
                       </Route>
                   </Route>
               </Routes>

               <Footer />
           </BrowserRouter>
       </AuthProvider>
   );
}

export default App;