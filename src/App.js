// App.js
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './components/adminDashBoard/AdminDashBoard';
import SellerDashBoard from './components/SellerDashBoard/DashBoadr';
import PageContent from './components/adminDashBoard/PageContent';
import AllOrders from './pages/AdminPanel/Orders';
import Products from './pages/AdminPanel/Products';
import AllUsers from './pages/AdminPanel/Users';
import MDashBoard from './pages/AdminPanel/Dashboard';
import AppRoutes from './components/adminDashBoard/AppRoutes';
import Store from './pages/SellerPanel/Store';
import Users from './pages/SellerPanel/Users';
import Order from './pages/SellerPanel/Order';
import UserLogin from './components/UserDashBoard/form/UserLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login"   element={<UserLogin/>}/>
      <Route path="/signup" />

      {/* Protected routes */}
      <Route path="/admin" element={<DashBoard/>}/>
      <Route path="/user"/>

      {/* Render PageContent based on the URL path */}
      <Route path="/admin/*" element={<PageContentRouter />} />
      <Route path="/admin/Admin-dashBoard" element={<MDashBoard />} />
      <Route path="/admin/Products" element={<Products />} />
      <Route path="/admin/Users" element={<AllUsers />} />
      <Route path="/admin/Orders" element={<AllOrders />} />


      <Route path="/seller"  element={<SellerDashBoard/>} />
      <Route path="/seller/Store"  element={<Store/>} />
      <Route path="/seller/Users"  element={<Users/>} />
      <Route path="/seller/Order"  element={<Order/>} />




    </Routes>
  );
}

function PageContentRouter() {
  const { '*': option } = useParams(); // Destructure the wildcard parameter from the URL
  return <PageContent option={decodeURIComponent(option)} />; // Pass it to PageContent
}

export default App;
