const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.register = async ({
  username,
  password,
  firstName,
  lastName,
  roomNumber,
}) => {
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error("User already exists");
    }
    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      roomNumber,
      privilege: "resident",
    });
    await newUser.save();
    return "User created successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Username is not registered");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password incorrect");
    }
    const token = generateJWT(user);

    return {
      token: token,
      privilege: user.privilege,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
