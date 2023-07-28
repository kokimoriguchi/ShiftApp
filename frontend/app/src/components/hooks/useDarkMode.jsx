import { useCallback, useEffect, useState } from "react";

// dark mode と light mode を切り替える
export const useDarkMode = () => {
  // ローカルストレージから初期状態を取得する
  const initialMode = window.localStorage.getItem("darkMode") === "true";

  const [isDarkMode, setIsDarkMode] = useState(initialMode);

  const toggle = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    // ダークモードの状態をローカルストレージに保存する
    window.localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggle };
};
