import CredentialUpdate from "./components/CredentialUpdate/CredentialUpdate"



const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-forms">
        <div className="profile-update-container">
          <h2 className="profile-update-title">Update your Profile:</h2>
          <CredentialUpdate/>
        </div>
      </div>
    </div>
  )
}

export default Profile
