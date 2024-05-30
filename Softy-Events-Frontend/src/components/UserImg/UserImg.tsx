interface UserImgProps
{
  avatar: string;
  name: string;
}
const UserImg = ({ avatar, name }:UserImgProps) =>
{
  return (
    <div className="user-img">
      <img src={`/${avatar}`} />
      <span>{name}</span>
    </div>
  );
};

export default UserImg;
