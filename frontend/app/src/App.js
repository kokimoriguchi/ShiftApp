import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/hooks/Auth";
import AuthProvider from "./components/hooks/Auth";
import TopLogin from "./components/pages/TopLogin";
import StaffTop from "./components/pages/StaffTop";
import StoreCreate from "./components/pages/StoreCreate";
import EmployeeCreate from "./components/pages/EmployeeCreate";
import ManagerCreate from "./components/pages/ManagerCreate";
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";
import Calender from "./components/pages/Calender";
import SubmitCalender from "./components/pages/SubmitCalender";

function AllRoutes() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/calender/submit" element={<SubmitCalender />} />
      <Route path="/calender" element={<Calender />} />
      <Route path="/staff/top" element={auth ? <StaffTop /> : <TopLogin />} />
      <Route path="/manager/create" element={<ManagerCreate />} />
      <Route path="/employee/create" element={<EmployeeCreate />} />
      <Route path="/store/create" element={<StoreCreate />} />
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
