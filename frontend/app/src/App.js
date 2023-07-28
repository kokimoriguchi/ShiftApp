import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/hooks/Auth";
import AuthProvider from "./components/hooks/Auth";
import ManagerLogin from "./components/pages/ManagerLogin";
import StoreCreate from "./components/pages/StoreCreate";
import EmployeeCreate from "./components/pages/EmployeeCreate";
import ManagerCreate from "./components/pages/ManagerCreate";
import Header from "./components/pages/Header";
import Home from "./components/pages/Home";
import Calender from "./components/pages/Calender";
import SubmitCalender from "./components/pages/SubmitCalender";
import ManagerTop from "./components/pages/ManagerTop";
import EmployeeLogin from "./components/pages/EmployeeLogin";
import EmployeeTop from "./components/pages/EmployeeTop";
import ConfirmShiftCalender from "./components/pages/ConfirmShiftCalender";
import Footer from "./components/pages/Footer";

function AllRoutes() {
  const { auth, isManager } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/manager/:storeNumber/edit"
        element={auth && isManager ? <Calender /> : <ManagerLogin />}
      />
      <Route
        path="/manager/:storeNumber/create/employee"
        element={auth && isManager ? <EmployeeCreate /> : <ManagerLogin />}
      />
      <Route
        path="/manager/:storeNumber"
        element={auth && isManager ? <ManagerTop /> : <ManagerLogin />}
      />
      <Route
        path="/:storeNumber/calender/:year/:month"
        element={auth ? <ConfirmShiftCalender /> : <EmployeeLogin />}
      />
      <Route
        path="/staff/:storeNumber/calender/submit"
        element={auth ? <SubmitCalender /> : <EmployeeLogin />}
      />
      <Route path="/calender" element={<Calender />} />
      <Route
        path="/staff/:storeNumber"
        element={auth ? <EmployeeTop /> : <EmployeeLogin />}
      />
      <Route path="/manager/:storeNumber/create" element={<ManagerCreate />} />
      <Route path="/employee/create" element={<EmployeeCreate />} />
      <Route path="/store/create" element={<StoreCreate />} />
      <Route path="/manager/login" element={<ManagerLogin />} />
      <Route path="/login" element={<EmployeeLogin />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="min-h-screen dark:bg-black">
      <AuthProvider>
        <Router>
          <Header />
          <AllRoutes />
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}
export default App;
