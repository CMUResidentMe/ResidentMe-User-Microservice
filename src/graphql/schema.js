const { buildSchema } = require("graphql");
const {
  register,
  login,
  getUser,
  getUserById,
} = require("../controllers/authController");

const schema = buildSchema(`
  enum PrivilegeType{
    manager
    staff
    resident
  }

  type Query {
    getUser(username: String!): User
    getUserById(id: ID!): User
  }

  type Mutation {
    register(username: String!, password: String!, firstName: String!, lastName: String!, roomNumber: Int, privilege: PrivilegeType): String
    login(username: String!, password: String!): AuthResponse
  }
  type User {
    username: String
    firstName: String
    lastName: String
    roomNumber: Int
    privilege: PrivilegeType
  }
  type AuthResponse {
    token: String!
    username: String!
    privilege: String!
  }
`);

const User = require("../models/User");
const { get } = require("http");

// The root provides a resolver function for each API endpoint
const root = {
  // The register and login functions are defined in the authController.js file
  register: ({
    username,
    password,
    firstName,
    lastName,
    roomNumber,
    privilege,
  }) => {
    return register({
      username,
      password,
      firstName,
      lastName,
      roomNumber,
      privilege,
    });
  },
  login: async ({ username, password }) => {
    try {
      const response = await login({ username, password });
      return {
        token: response.token,
        username: response.username,
        privilege: response.privilege,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Function to get a user by username
  getUser: async ({ username }) => {
    try {
      const user = await getUser(username);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roomNumber: user.roomNumber,
        privilege: user.privilege,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Function to get a user by ID
  getUserById: async ({ id }) => {
    try {
      const user = await getUserById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roomNumber: user.roomNumber,
        privilege: user.privilege,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { schema, root };
