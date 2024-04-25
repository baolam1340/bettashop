import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { get_categorys } from "./store/reducers/homeReducer";
import CategoryShops from "./pages/CategoryShops";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import Dashboard from "./pages/Dashboard";
import ProtectUser from "./utils/ProtectUser";
import Index from "./components/dashboard/Index.jsx";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import ChangePassword from "./components/dashboard/ChangePassword";
import Order from "./components/dashboard/Order";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";
import Address from "./components/dashboard/Address";
import Profile from "./components/dashboard/Profile";
import Event from "./pages/Event";
import Tatca from "./components/dashboard/orders/Tatca";
import Vanchuyen from "./components/dashboard/orders/Vanchuyen";
import Choxuly from "./components/dashboard/orders/Choxuly";
import Dahuy from "./components/dashboard/orders/Dahuy";
import Danggiao from "./components/dashboard/orders/Danggiao";
import Hoanthanh from "./components/dashboard/orders/Hoanthanh";
import OrderDetails from "./components/dashboard/OrderDetails";
import Trahang from "./components/dashboard/orders/Trahang.jsx";
import Coupon from "./components/dashboard/Coupon.jsx";
import FloatingMessageButton from "./components/MessageButton/FloatingMessageButton .jsx";
import Chitieu from "./components/dashboard/Chitieu.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_categorys());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/product?" element={<CategoryShops />} />
        <Route path="/product/search?" element={<SearchProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/event" element={<Event />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/details/:slug" element={<Details />} />

        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />} />
            <Route path="address" element={<Address />} />
            <Route path="chitieu" element={<Chitieu />} />
            <Route path="coupon" element={<Coupon />} />
            <Route path="my-orders" element={<Orders />} />

            <Route key={1} path="tatca" element={<Tatca />} />
            <Route key={2} path="choxuly" element={<Choxuly />} />
            <Route key={3} path="vanchuyen" element={<Vanchuyen />} />
            <Route key={4} path="danggiao" element={<Danggiao />} />
            <Route key={5} path="hoanthanh" element={<Hoanthanh />} />
            <Route key={6} path="dahuy" element={<Dahuy />} />
            <Route key={6} path="trahang" element={<Trahang />} />
            <Route path="order/:orderId" element={<OrderDetails />} />

            <Route path="my-wishlist" element={<Wishlist />} />
            <Route path="order/details/:orderId" element={<Order />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="chat/:sellerId" element={<Chat />} />
          </Route>
        </Route>
      </Routes>
      <FloatingMessageButton />
    </BrowserRouter>
  );
}

export default App;
