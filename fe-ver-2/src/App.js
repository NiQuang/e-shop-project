import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdmLayout from "./components/layout/admLayout/AdmLayout";
import AdmHome from "./pages/admin/home/AdmHome";
import AdmList from "./pages/admin/list/AdmList";
import AdmSingle from "./pages/admin/single/AdmSingle";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdmLayout />}>
            <Route index element={<AdmHome />}/>
            <Route path="users" element={<AdmList />}/>
            <Route path="users/:userid" element={<AdmSingle />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
