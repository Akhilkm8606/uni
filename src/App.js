  // App.js
  import './App.css';
  import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
  import DashBoard from './components/adminDashBoard/AdminDashBoard';
  import SellerDashBoard from './components/SellerDashBoard/DashBoadr';
  import PageContent from './components/adminDashBoard/PageContent';
  import OrderList from './pages/AdminPanel/Order/Orders';
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
  import { useEffect, useState } from 'react';
  import { userAuthentic, userLogOut } from './components/Redux/Slice/user';
  import PaymentSuccess from './pages/UserPanel/payment/PaymentSuccess';
  import About from './components/UserDashBoard/Layout/About/About';
  import Contact from './components/UserDashBoard/Layout/Contact/Contact';
  import MyAccount from './components/UserDashBoard/Layout/Profile/Profile';
  import EditProfile from './components/UserDashBoard/Layout/Profile/EditProfile';
import SideMenu from './components/SellerDashBoard/SideMenu';
import Sidebar from './components/adminDashBoard/Sidebar';
import OrderDetails from './pages/AdminPanel/Order/OrderDetails';
import UserList from './pages/AdminPanel/Users/UserList';
import AddProduct from './pages/AdminPanel/Products/Add/AddProduct';
import EditUser from './pages/AdminPanel/Users/EditUser';
import EditProduct from './pages/AdminPanel/Products/List/EditProduct';


  function App() {
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [showHeader, setShowHeader] = useState(true); // Local state to manage header visibility

    const hideHeaderRoutes = ['/login', '/signup', ];

    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname) || location.pathname.startsWith('/admin') || location.pathname.startsWith('/seller');
    const currentRoute = location.pathname;
    useEffect(() => {
      setShowHeader(!shouldHideHeader);
    }, [location.pathname]);

    return (
      <>
        {showHeader && !shouldHideHeader && <Header />}

      
        <Routes>   
                <Route path="/" element={< Home/>} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product/cart/:id" element={<Cart />} />
          <Route path="/sad" element={<Loader />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Products/:keyword" element={<Products />} />
          <Route path="/adReview/:id" element={<ReviewCard />} />
          <Route path="/Cart" element={< Cart />} />
          <Route path="/Order/:id" element={< Order />} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess/>}  />
        {/* admin */}
            <Route path="/seller" element={<DashBoard />}>
            <Route element={<Sidebar />} />
  <Route path="/seller/*" element={<PageContentRouter />} />
  

            </Route>

        <Route path="/admin" element={<DashBoard />}>
  <Route element={<Sidebar />} />
  <Route path="/admin/*" element={<PageContentRouter />} />
  
         
 <Route path="/admin/users" element={<PageContent option="UserList" userRole="admin" />} />
  </Route>
    <Route path="/admin/order/:id" element={<OrderDetails />} />
    <Route path="/admin/user/:id" element={<EditUser />} />
    <Route path="/admin/products/edit/:id" element={< EditProduct/>} />




        
        </Routes>
        {showHeader && !shouldHideHeader && <Footer/>}    </>

    );
  }


  function PageContentRouter() {
    const { '*': option } = useParams(); 
    console.log('URL Parameter:', option); // Destructure the wildcard parameter from the URL
    return <PageContent option={decodeURIComponent(option)} />; // Pass it to PageContent
  }

  export default App;
