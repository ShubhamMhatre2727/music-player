// utils/setFavicon.js
export function setFavicon(url:string) {
  let link:any = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = url;
}
