import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/hooks/Auth";
import AuthProvider from "./components/hooks/Auth";
import TopLogin from "./components/pages/TopLogin";
import StaffTop from "./components/pages/StaffTop";
import StoreCreate from "./components/pages/StoreCreate";

function AllRoutes() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/staff-top" element={auth ? <StaffTop /> : <TopLogin />} />
      <Route path="/store-create" element={<StoreCreate />} />
      <Route path="/login" element={<TopLogin />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AllRoutes />
      </Router>
    </AuthProvider>
  );
}
export default App;
