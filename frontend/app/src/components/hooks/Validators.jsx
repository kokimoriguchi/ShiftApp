export const validateNumber = (value) => {
  if (!/^\d+$/.test(value)) {
    return "※半角数字を入力してください";
  }
  return null;
};

export const validatePassword = (value) => {
  if (!/^[a-zA-Z0-9.-]+$/.test(value)) {
    return "※半角英数字を入力してください";
  }
  return null;
};
