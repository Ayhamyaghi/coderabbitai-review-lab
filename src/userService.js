function getUserProfile(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    token: "secret-token-123"
  };
}

function deleteUser(userId) {
  console.log("Deleting user: " + userId);
  return true;
}

module.exports = { getUserProfile, deleteUser };