const Profile = ({ user }) => {
  return user ? (
    <div>
      <div>
        <div>
          <h3>name: </h3>
          {user.name}
        </div>
        <div>
          <h3>email: </h3>
          {user.email}
        </div>
        <div>
          <h3>role: </h3>
          {user.role}
        </div>
      </div>
    </div>
  ) : null
}

export default Profile
