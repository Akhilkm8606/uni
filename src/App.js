// App.js
import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import DashBoard from './components/adminDashBoard/AdminDashBoard';
import SellerDashBoard from './components/SellerDashBoard/DashBoadr';
import PageContent from './components/adminDashBoard/PageContent';
import AllOrders from './pages/AdminPanel/Orders';
import ADMProducts from './pages/AdminPanel/Products/Products';
import AllUsers from './pages/AdminPanel/Users/Users';
import MDashBoard from './pages/AdminPanel/Dashboard';
import Store from './pages/SellerPanel/Store';
import Users from './pages/SellerPanel/Users';
import Order from './pages/UserPanel/Order/ProductOrder';
import UserLogin from './components/UserDashBoard/form/UserLogin';
import Profile from './pages/AdminPanel/Profile';
import UserSignUp from './components/UserDashBoard/form/UserSignUp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ProtectedRouter from './components/utils/ProtectedRotes';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/UserDashBoard/Layout/Home/Home';
import ProductDetails from './pages/UserPanel/Product/ProductDetails';
import Loader from './components/UserDashBoard/Layout/Loader/Loader';
import Footer from './components/UserDashBoard/Layout/Footer/Footer';
import Header from './components/UserDashBoard/Layout/Header/Head';
import Cart from './pages/UserPanel/Cart/Cart';
import Products from './pages/UserPanel/Product/Products';
import ReviewCard from './pages/UserPanel/Product/Review/ReviewCard';
import { useEffect } from 'react';
import { userAuthentic, userLogOut } from './components/Redux/Slice/user';
import Payment from './pages/UserPanel/payment/Payment';



function App() {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  return (
    <>
    <Header/>
    {/* user */}
      <Routes>
        <Route path="/" element={< Home/>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/cart/:id" element={<Cart />} />
        <Route path="/sad" element={<Loader />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Products/:keyword" element={<Products />} />
        <Route path="/adReview/:id" element={<ReviewCard />} />
        <Route path="/Cart" element={< Cart />} />
        <Route path="/Order/:id" element={< Order />} />
        <Route path="/Order/payment/:id" element={<Payment/>}  />
      {/* admin */}
        <Route path="/admin" element={<DashBoard />} />
        <Route path="/admin/*" element={<PageContentRouter />} />
        <Route path="/admin/Admin-dashBoard" element={<MDashBoard />} />
        <Route path="/admin/Products" element={<ADMProducts />} />
        <Route path="/admin/Users" element={<AllUsers />} />
        <Route path="/admin/Orders" element={<AllOrders />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/AddProdcts" element={<PageContent option="AddProdcts" />} />
  


      {/* seller */}
        <Route path="/seller" element={<SellerDashBoard />} />
        <Route path="/seller/Store" element={<Store />} />
        <Route path="/seller/Users" element={<Users />} />
        <Route path="/seller/Order" element={<Order />} />
      </Routes>
    <Footer/>
    </>

  );
}

function PageContentRouter() {
  const { '*': option } = useParams(); // Destructure the wildcard parameter from the URL
  return <PageContent option={decodeURIComponent(option)} />; // Pass it to PageContent
}

export default App;
