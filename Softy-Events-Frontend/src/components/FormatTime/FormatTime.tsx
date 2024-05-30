const FormatTime = ({ originalTime }:any) => {
  const formatTime = (timeString:string) => {
    const dateObj = new Date(timeString);

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so we add 1
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const formattedTime = formatTime(originalTime);

  return (
    <div>
      <p className="table-data-user-field">{formattedTime}</p>
    </div>
  );
};
export default FormatTime;
