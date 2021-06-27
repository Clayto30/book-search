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

            return user;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);
            return user;
        }
    },
    saveBook: async ( parent, { bookData }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
            );
            return updatedUser;
        }
    }
};

module.exports = resolvers;