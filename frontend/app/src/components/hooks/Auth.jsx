// Auth.jsx

import React, { createContext, useState } from "react";

// contextを使用しprovider配下のコンテキストを決定する。受け取る際はconsumerで受け取る。
export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
