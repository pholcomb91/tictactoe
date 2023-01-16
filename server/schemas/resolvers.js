const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
       user: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({_id: context.user._id}).select("-_v -password"
            );
            return userData;
        }
        throw new AuthenticationError('Not logged in');
       },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("That player isn't on the board!");
            }
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError("Wong password, loser!");
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        updateScore: async (parent, { username, wtl }) => {
            const updatedUser = await User.findOneAndUpdate(
                { username },
                { $inc: { [wtl]: 1 }},
                { new: true }
            );
            return updatedUser;
        }
    },
};
  
  
  module.exports = resolvers;