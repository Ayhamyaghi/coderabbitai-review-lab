const { login } = require("./auth");
const { getUserProfile, deleteUser } = require("./userService");

const user = login("admin", "123456");

const profile = getUserProfile(user);
console.log(profile);

deleteUser(user.id);