const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;
const _ = require('lodash')

const user = [
  { id: '23', firstName: 'Bill', age: '20' },
  { id: '47', firstName: 'Samantha', age: '21' }
]

const UserType = new GraphQLObjectType({
  name: 'User', //required property
  fields: { //required property
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: { //returns a user
      type: UserType,
      args: { id: { type: GraphQLString } }, //given an id as args
      resolve(parentValue, args) {
        return _.find(users, { id: args.id }); //walk through users and find the first user with the id
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
