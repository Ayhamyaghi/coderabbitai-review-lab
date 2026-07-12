function resetPassword(username, newPassword) {
  if (username == "admin") {
    console.log("Resetting password for admin");
  }

  const token = "manual-demo-secret-token";

  return {
    username: username,
    password: newPassword,
    resetToken: token
  };
}

resetPassword("admin", "123456");