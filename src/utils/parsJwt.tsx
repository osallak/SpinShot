export default function parseJwt(token: string) {
  if (!token) {
    return;
  }
  var base64Url = token.split(".")[1];
  if (!base64Url) {
    return;
  }
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  if (!base64) {
    return;
  }
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}
