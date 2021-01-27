const TOKEN_NAME = "token";

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

export const isStrongPassword = (password) => {
  return passwordRegExp.test(password.toString());
};

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);

export function toCurrency(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "NT$" + parts.join(".");
}

export function translateAuth(AuthTypeId) {
  switch (AuthTypeId) {
    case 1:
      return "一般會員";
    case 2:
      return "開課者";
    case 3:
      return "管理員";
    default:
      return "未知";
  }
}
