const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const resolvers = {
    Query: {
        // query me for the logged in user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
            
            return userData;    
            }
            throw new AuthenticationError('Not logged in!');
        }
    },
    // mutations will go here (addUser, Login, SaveBook)
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
        },
        // login: async () => {

        // }
    }
};

module.exports = resolvers;