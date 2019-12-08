const graphql = require('graphql');
const User = require('../models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        restaurantName: { type: GraphQLString },
        cuisine: { type: GraphQLString },
        owner: { type: GraphQLBoolean }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getUserProfile: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async function (parent, args, { req, res}) {
                const user = await User.findOne({ _id: req.session.ID })
                if (user) {
                    console.log(user);
                    return user;
                } else {
                    console.log('no user found...');
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                restaurantName: { type: GraphQLString },
                cuisine: { type: GraphQLString },
                owner: { type: GraphQLBoolean }
            },
            resolve: function (parent, args) {
                const userModel = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password,
                    restaurantname: args.restaurantName,
                    cuisine: args.cuisine,
                    owner: args.owner
                });
                bcrypt.hash(userModel.password, saltRounds, function (err, hash) {
                    if (err) throw err;
                    userModel.password = hash;
                    userModel.save()
                        .then(() => console.log('graphql: register success'))
                        .catch(err => console.log(err))
                });
                return userModel;
            }
        },
        loginUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async function (parent, args, { req, res }) {
                const user = await User.findOne({ email: args.email })
                if (user) {
                    const isMatch = await bcrypt.compare(args.password, user.password)
                    if (isMatch) {
                        const cookieValue = user.owner ? 'owner' : 'buyer';
                        res.cookie('cookie', cookieValue, { maxAge: 900000, httpOnly: false, path: '/' });
                        req.session.ID = user.id;
                        req.session.isLoggedIn = true;
                        console.log('graphql: login success');
                    }
                    throw new Error('Invalid credentials')
                }
                res.send('login success');
            }
        },
        logoutUser: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            resolve: function (parent, args, { req }) {
                req.session.isLoggedIn = false;
                req.session.ID = null;
                console.log("graphql: logout success");
                return;
            }
        },

        updateProfile: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                restaurantName: { type: GraphQLString },
                cuisine: { type: GraphQLString }
            },
            resolve: function (parent, args, { req }) {
                Users.findByIdAndUpdate(req.session.ID, args, (err, user) => {
                    if (err) throw err;
                    res.send("update profile success");
                });
                console.log("graphql: update profile success");
                return;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});