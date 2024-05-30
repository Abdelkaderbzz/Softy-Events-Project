import { setRoomIdInLocalStorage } from "./localStoreage";
export const generateScript = (roomId: string) => {
  setRoomIdInLocalStorage(roomId);
  return `<script roomId=${roomId}>document.addEventListener("DOMContentLoaded",function(){let e=document.createElement("script"),n=document.createElement("script");n.src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.2/socket.io.js",n.integrity="sha512-jMNwWSmjje4fjYut9MBGKXw5FZA6D67NHAuC9szpjbbjg51KefquNfvn4DalCbGfkcv/jHsHnPo1o47+8u4biA==",n.crossOrigin="anonymous",n.referrerPolicy="no-referrer",e.src="https://integrated666.netlify.app/integration.js",document.body.appendChild(e),document.body.appendChild(n)})</script>`;
};
