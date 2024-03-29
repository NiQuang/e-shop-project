import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/layout/AdminLayout';
import WebsiteLayout from './components/layout/WebsiteLayout';
import ProtectAdmin from './components/protect-admin/ProtectAdmin';
import AdmCategories from './features/admin/AdmCategories';
import AdmDashboard from './features/admin/AdmDashboard';
import AdmOrders from './features/admin/AdmOrders';
import AdmProducts from './features/admin/AdmProducts';
import WebAboutUs from './features/website/WebAboutUs';
import WebAllOrder from './features/website/WebAllOrder';
import WebCart from './features/website/WebCart';
import WebHomePage from './features/website/WebHomePage';
import WebLogin from './features/website/WebLogin';
import WebProduct from './features/website/WebProduct';
import WebProductDetail from './features/website/WebProductDetail';
import WebSingleOrderDetail from './features/website/WebSingleOrderDetail';
import WebSignUp from './features/website/WebSingUp';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<WebHomePage />} />
          <Route path="products" element={<WebProduct />} />
          <Route path="products/detail/:id" element={<WebProductDetail />} />
          <Route path="about-us" element={<WebAboutUs />} />
          <Route path="cart" element={<WebCart />} />
          <Route path="login" element={<WebLogin />} />
          <Route path="signup" element={<WebSignUp />} />
          <Route path="my-all-order" element={<WebAllOrder />} />
          <Route path="my-order/:id" element={<WebSingleOrderDetail  />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
        <Route path="/admin" element={<ProtectAdmin>
          <AdminLayout />
        </ProtectAdmin>}>
          <Route index element={<AdmDashboard />} />
          <Route path="orders" element={<AdmOrders />} />
          <Route path="users" element={<div>Users Manager</div>} />
          <Route path="categories" element={<AdmCategories />} />
          <Route path="products" element={<AdmProducts />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
