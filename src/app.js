import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
    ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/footer/footer";
import FooterBottom from "./components/home/footer/footer_bottom";
import Header from "./components/home/header/header";
import HeaderBottom from "./components/home/header/header_bottom";
import SpecialCase from "./components/special_case/special_case";
import About from "./pages/about/about";

import SignIn from "./pages/account/sign_in";
import SignUp from "./pages/account/sign_up";
import Cart from "./pages/cart/cart";
import Contact from "./pages/contact/contact";
import Home from "./pages/home/home";
import Offer from "./pages/offer/offer";
import Payment from "./pages/payment/payment";
import ProductDetails from "./pages/product_details/product_details";
import Shop from "./pages/shop/shop";
import AdminNavbar from "./components/user/admin_navbar";
import ActiveUser from "./components/user/active_user";
import FetchDeletedUsers from "./components/user/fetch_deleted_user";
import UserDetails from "./components/user/user_details";
import Category from "./pages/category/category";
import Profile from "./pages/about/profile";
import ResetPassword from "./pages/account/reset_password";
import SearchResults from "./components/user/search_results";
import UserProfile from "./pages/account/user_profile";
import AddProduct from "./components/user/add_product";
import Checkout from "./pages/checkout/checkout";

const Layout = () => {
    return (
        <div>
            <Header/>
            <HeaderBottom/>
            <SpecialCase/>
            <ScrollRestoration/>
            <Outlet/>
            <Footer/>
            <FooterBottom/>
        </div>
    );
};
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                {/* ==================== Header Navlink Start here =================== */}
                <Route index element={<Home/>}></Route>
                <Route path="/shop" element={<Shop/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/user-profile/" element={<UserProfile/>}/>

                <Route path="/contact" element={<Contact/>}></Route>
                {/* ==================== Header Navlink End here ===================== */}
                <Route path="/offer" element={<Offer/>}></Route>
                <Route path="/category/:categoryName" element={<Category/>}></Route>
                <Route
                    path="/product/:productName"
                    element={<ProductDetails/>}
                ></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/paymentgateway" element={<Payment/>}></Route>
                <Route path="/checkout" element={<Checkout/>}></Route>
                <Route path="/user-profile/" element={<UserProfile/>}/>
            </Route>

            <Route path="/admin"
                   element={<AdminNavbar/>}>
                <Route path="/admin/active-users" element={<ActiveUser/>}/>
                <Route path="/admin/fetch-deleted-users" element={<FetchDeletedUsers/>}/>
                <Route path="user-detail/:id" element={<UserDetails/>}/>
                <Route path="/admin/search-results" element={<SearchResults/>}/>
                <Route path="/admin/add-product" element={<AddProduct/>}/>
            </Route>

            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route path="/forgot_password" element={<ResetPassword/>}></Route>
        </Route>
    ),
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;