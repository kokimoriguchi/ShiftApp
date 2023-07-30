// Auth.jsx

import React, { createContext, useState } from "react";

// contextを使用しprovider配下のコンテキストを決定する。受け取る際はconsumerで受け取る。
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [contextStoreNumber, setContextStoreNumber] = useState("");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isManager,
        setIsManager,
        employeeName,
        setEmployeeName,
        storeName,
        setStoreName,
        contextStoreNumber,
        setContextStoreNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
