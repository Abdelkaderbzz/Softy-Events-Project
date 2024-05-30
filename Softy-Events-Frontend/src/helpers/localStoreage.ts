export const setArrayOfContentInLocalStorage = (array: string[]) => {
  localStorage.setItem("arrayOfContent", JSON.stringify(array));
};
export const getArrayOfContentFromLocalStorage = () => {
  const storedArray = localStorage.getItem("arrayOfContent");
  return storedArray ? JSON.parse(storedArray) : null;
};
export const setRoomIdInLocalStorage = (RoomId: string) => {
  localStorage.setItem("RoomId", RoomId);
};
export const getRoomIdInLocalStorage = () => {
  const RoomId = localStorage.getItem("RoomId");
  return RoomId ? RoomId : null;
};
