export const validateNumber = (value) => {
  if (!value || value.trim() === "") {
    return "※数字を入力してください";
  }
  if (!/^\d+$/.test(value)) {
    return "※半角数字を入力してください";
  }
  if (value.length < 5) {
    return "※5桁以上で入力してください";
  }
  return null;
};

export const validatePassword = (value) => {
  if (!value || value.trim() === "") {
    return "※パスワードを入力してください";
  }
  if (!/^[a-zA-Z0-9.-]+$/.test(value)) {
    return "※半角英数字を入力してください";
  }
  if (value.length < 5) {
    return "※パスワードは5文字以上で入力してください";
  }
  return null;
};

export const validateName = (value) => {
  if (!value || value.trim() === "") {
    return "※名前を入力してください";
  }
  if (
    !/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}a-zA-Zー\s]+$/u.test(
      value
    )
  ) {
    return "※全角ひらがな、全角カタカナ、漢字、英語のいずれかを入力してください";
  }
  return null;
};

export const validateSkillName = (value) => {
  if (!value || value.trim() === "") {
    return "※スキル名を入力してください";
  }
  return null;
};
