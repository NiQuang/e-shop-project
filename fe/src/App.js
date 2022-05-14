import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/layout/AdminLayout';
import WebsiteLayout from './components/layout/WebsiteLayout';
import AdmCategories from './features/admin/AdmCategories';
import AdmDashboard from './features/admin/AdmDashboard';
import AdmProducts from './features/admin/AdmProducts';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>

        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdmDashboard />}/>
          <Route path="users" element={<div>Users Manager</div>}/>
          <Route path="categories" element={<AdmCategories />}/>
          <Route path="products" element={<AdmProducts />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
