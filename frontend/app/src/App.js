import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./components/hooks/Auth";
import AuthProvider from "./components/hooks/Auth";
import TopLogin from "./components/pages/TopLogin";
import StaffTop from "./components/pages/StaffTop";

function AuthRoutes() {
  const { auth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/StaffTop" element={auth ? <StaffTop /> : <TopLogin />} />
      <Route path="/Login" element={<TopLogin />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthRoutes />
      </Router>
    </AuthProvider>
  );
}
export default App;
