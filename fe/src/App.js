import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/layout/AdminLayout';
import WebsiteLayout from './components/layout/WebsiteLayout';
import AdmCategories from './features/admin/AdmCategories';
import AdmDashboard from './features/admin/AdmDashboard';
import AdmProducts from './features/admin/AdmProducts';
import WebAboutUs from './features/website/WebAboutUs';
import WebCart from './features/website/WebCart';
import WebHomePage from './features/website/WebHomePage';
import WebLogin from './features/website/WebLogin';
import WebProduct from './features/website/WebProduct';
import WebProductDetail from './features/website/WebProductDetail';



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
          <Route path="*" element={<div>Page not found</div>} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdmDashboard />} />
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
