export function useToken() {
  function setToken(token: any) {
    localStorage.setItem("tokenData", JSON.stringify(token));
  }

  function getToken() {
    const token = localStorage.getItem("tokenData");
    return token ? JSON.parse(token) : undefined;
  }

  return {
    setToken,
    getToken,
  };
}
