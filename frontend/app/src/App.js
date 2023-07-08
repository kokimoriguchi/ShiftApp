import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/hooks/Auth";
import AuthProvider from "./components/hooks/Auth";
import TopLogin from "./components/pages/TopLogin";
import StaffTop from "./components/pages/StaffTop";
import StoreCreate from "./components/pages/StoreCreate";
import EmployeeCreate from "./components/pages/EmployeeCreate";
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";

function AllRoutes() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/staff-top" element={auth ? <StaffTop /> : <TopLogin />} />
      <Route path="/employee-create" element={<EmployeeCreate />} />
      <Route path="/store-create" element={<StoreCreate />} />
      <Route path="/login" element={<TopLogin />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AllRoutes />
      </Router>
    </AuthProvider>
  );
}
export default App;
