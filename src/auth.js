function login(username, password) {
  if (username == "admin" && password == "123456") {
    return {
      id: 1,
      username: username,
      role: "admin"
    };
  }

  return null;
}

module.exports = { login };
