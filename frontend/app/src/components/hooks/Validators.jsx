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
  if (value.length < 8) {
    return "※パスワードは8文字以上で設定してください";
  }
  return null;
};

export const validateName = (value) => {
  if (
    !/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}a-zA-Zー\s]+$/u.test(
      value
    )
  ) {
    return "※全角ひらがな、全角カタカナ、漢字、英語のいずれかを入力してください";
  }
  return null;
};
