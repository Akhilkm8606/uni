// App.js
import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import DashBoard from './components/adminDashBoard/AdminDashBoard';
import SellerDashBoard from './components/SellerDashBoard/DashBoadr';
import PageContent from './components/adminDashBoard/PageContent';
import AllOrders from './pages/AdminPanel/Orders';
import Products from './pages/AdminPanel/Products/Products';
import AllUsers from './pages/AdminPanel/Users/Users';
import MDashBoard from './pages/AdminPanel/Dashboard';
import Store from './pages/SellerPanel/Store';
import Users from './pages/SellerPanel/Users';
import Order from './pages/SellerPanel/Order';
import UserLogin from './components/UserDashBoard/form/UserLogin';
import Profile from './pages/AdminPanel/Profile';
import UserSignUp from './components/UserDashBoard/form/UserSignUp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ProtectedRouter from './components/utils/ProtectedRotes';
import { useSelector } from 'react-redux';
import Product from './components/UserDashBoard/Layout/Product/Product';
import Home from './components/UserDashBoard/Layout/Home/Home';
import ProductDetails from './pages/UserPanel/Product/ProductDetails';
import Loader from './components/UserDashBoard/Layout/Loader/Loader';
import Footer from './components/UserDashBoard/Layout/Footer/Footer';
import Header from './components/UserDashBoard/Layout/Header/Header';



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
        <Route path="/sad" element={<Loader />} />
      {/* admin */}
        <Route path="/admin" element={<DashBoard />} />
        <Route path="/admin/*" element={<PageContentRouter />} />
        <Route path="/admin/Admin-dashBoard" element={<MDashBoard />} />
        <Route path="/admin/Products" element={<Products />} />
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
