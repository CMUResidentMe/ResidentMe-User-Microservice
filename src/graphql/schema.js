const { buildSchema } = require("graphql");
const { register, login } = require("../controllers/authController");

const schema = buildSchema(`
  type Query {
    getUser(username: String!): User
  }
  type Mutation {
    register(username: String!, password: String!, firstName: String!, lastName: String!, roomNumber: Int!): String
    login(username: String!, password: String!): AuthResponse
  }
  type User {
    username: String
    firstName: String
    lastName: String
    roomNumber: Int
    privilege: String
  }
  type AuthResponse {
    token: String
    privilege: String
  }
`);

const User = require("../models/User");

const root = {
  register: ({ username, password, firstName, lastName, roomNumber }) => {
    return register({ username, password, firstName, lastName, roomNumber });
  },
  login: async ({ username, password }) => {
    try {
      const response = await login({ username, password });
      return {
        token: response.token,
        privilege: response.privilege,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getUser: async ({ username }) => {
    try {
      const user = await User.findOne({ username }).exec();
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
