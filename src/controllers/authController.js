const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to generate a JWT
const generateJWT = (user) => {
  return jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });
};

// Function to register a new user
exports.register = async ({
  username,
  password,
  firstName,
  lastName,
  roomNumber,
  privilege,
}) => {
  try {
    if (
      !username.trim() ||
      !password.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      typeof roomNumber !== "number"
    ) {
      throw new Error("All fields must be provided and valid");
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error("User already exists");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      roomNumber,
      privilege,
    });

    await newUser.save();
    return "User created successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to log in a user
exports.login = async ({ username, password }) => {
  try {
    if (!username.trim() || !password.trim()) {
      throw new Error("Username and password must be provided");
    }

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
      username: user.username,
      privilege: user.privilege,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUser = async (username) => {
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get a user by username
exports.getUser = async (username) => {
  try {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to get a user by ID
exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id).exec();
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
