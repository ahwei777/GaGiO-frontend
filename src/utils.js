export const getAuthToken = () => localStorage.getItem("token");

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
