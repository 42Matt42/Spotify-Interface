const { buildSchema } = require('graphql');

// GraphQL schema
const schema = buildSchema(`
    type Query {
        token(access_token: String): Token
        search(name: String): [Artist]
        albums(artist: String): [Album]
    },

    type Token {
        access_token: String!
        token_type: String
        expires_in: Int
        scope: String
    }

    type Artist {
        id: String!
        name: String
        href: String
        popularity: Int
        type: String
        uri: String
        picture: String
        followers: Followers
    }
    type Followers {
        total: Int!
    }

    type Album {
        id: String!
        name: String
        release_date: String
        uri: String
        picture: String
    }
`);

module.exports = schema