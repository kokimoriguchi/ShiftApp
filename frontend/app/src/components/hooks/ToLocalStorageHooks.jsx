export const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    alert("シフトを保存しました");
  } catch (error) {
    console.log(error);
    alert("シフトの保存に失敗しました");
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) return undefined;
    return JSON.parse(serializedValue);
  } catch (error) {
    console.log(error);
    alert("シフトの取得に失敗しました");
    return undefined;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    alert("シフトを削除しました");
  } catch (error) {
    console.log(error);
    alert("シフトの削除に失敗しました");
  }
};
