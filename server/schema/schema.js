const graphql = require('graphql');
const User = require('../models/User');
const Item = require('../models/Item');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLBoolean,
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

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        section: { type: GraphQLString },
        restaurantName: { type: GraphQLString },
        owner_id: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: async function (parent, args, { req, res }) {
                const user = await User.findOne({ _id: req.session.ID })
                if (user) {
                    console.log('QUERY USER: ' + user);
                    return user;
                }
            }
        },
        item: {
            type: ItemType,
            args: { id: { type: GraphQLID } },
            resolve: async function (parent, args) {
                const item = await Item.findOne({ _id: args.id })
                if (item) {
                    console.log(item);
                    return item;
                }
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            resolve: async function (parent, args) {
                const items = await Item.find({})
                if (items) {
                    console.log(items);
                    return items;
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
                    restaurantName: args.restaurantName,
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
                        req.session.restaurantName = user.restaurantName;
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
                req.session.restaurantName = null;
                console.log("graphql: logout success");
                return;
            }
        },
        getUserProfile: {
            type: UserType,
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function (parent, args, { req }) {
                const user = await User.findOne({ _id: req.session.ID })
                if (user) {
                    console.log('graphql: fetch user profile success');
                    return user;
                }
            }
        },
        updateUserProfile: {
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
                    console.log("graphql: update user profile success");
                    return user;
                });
            }
        },
        addItem: {
            type: ItemType,
            args: {
                name: { type: GraphQLString },
                section: { type: GraphQLString }
            },
            resolve: function (parent, args, { req }) {
                const newItem = new Item({
                    name: args.name,
                    section: args.section,
                    restaurantName: req.session.restaurantName,
                    owner_id: req.session.ID
                });
                newItem.save()
                    .then(() => console.log('graphql: add item success'))
                    .catch(err => console.log(err))
                return newItem;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});