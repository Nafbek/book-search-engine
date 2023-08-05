const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("Book");
    },
    user: async () => {
      return User.findById(_id).populate("Book");
    },
    books: async (_, args) => {
      return Book.findOne(args);
    },
    book: async (_, { bookId }) => {
      return Book.findById({ _id: bookId });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("Book");
      }
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, args) => {
      const user = await User.findOne(args.email);

      if (!user) {
        throw new AuthenticationError("No user found with that email address");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError(
          "Incorrect password! Please re-enter your password"
        );
      }
      const token = signToken(user);
      return { user, token };
    },
  },
};

module.exports = resolvers;
