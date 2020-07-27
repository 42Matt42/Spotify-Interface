const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')

// for dev purposes
const cors = require('cors');

// light package for requests
const { get } = require('httpie');
const { post } = require('httpie');

// .env
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
const dotenv = require('dotenv')
dotenv.config();
const buff = Buffer.from(process.env.SPOTIFY_CLIENT_ID+":"+process.env.SPOTIFY_CLIENT_SECRET);
const spotifyId = buff.toString('base64');
var token = ''

async function newToken() {
    let freshToken;
    try {
        freshToken = await post('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${spotifyId}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            body: `grant_type=client_credentials`,
            cache: 'default',
        })
    } catch (error) { 
        freshToken = await console.error('ERROR', error)
    }
    // token = freshToken.data.access_token
    console.log('TOKEN_IS_', freshToken.data.access_token)
    return freshToken.data.access_token;
}

// GET https://api.spotify.com/v1/search?q=${keyword}&type=artist
// https://developer.spotify.com/documentation/web-api/reference/search/search/

var getSpotifyArtist = async function(args) {
    // console.log('getSpotifyArtist_')
    // console.log('args_', args)
    let findArtist

    token = await newToken();
    // console.log('test_HEADERS_getSpotifyArtist', `Authorization: Bearer ${token}`)
    // console.log('test_URL_getSpotifyArtist', `https://api.spotify.com/v1/search?q=${args.name}&type=artist`)
    
    try {
        findArtist = await get(`https://api.spotify.com/v1/search?q=${args.name}&type=artist`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    } catch (error) { 
        findArtist = await console.error('ERROR_getSpotifyArtist', error)
    }
    for (let i = 0; i < parseInt(findArtist.data.artists.items.length); i++) {
        if (findArtist.data.artists.items[i].images[1]) {
            findArtist.data.artists.items[i].picture = findArtist.data.artists.items[i].images[1].url
        }
    }
    return findArtist.data.artists.items;
}

// GET https://api.spotify.com/v1/artists/{id}/albums
// https://developer.spotify.com/documentation/web-api/reference/artists/get-artists-albums/

var getSpotifyAlbums = async function(args) {
    console.log('getSpotifyAlbums_')
    console.log('args_', args)
    let findAlbums

    token = await newToken();
    // console.log('@ test_HEADERS_getSpotifyAlbums', `Authorization: Bearer ${token}`)
    // console.log('@ test_URL_getSpotifyAlbums', `https://api.spotify.com/v1/artists/${args.artist}/albums`)

    try {
        findAlbums = await get(`https://api.spotify.com/v1/artists/${args.artist}/albums`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
    } catch (error) { 
        findAlbums = await console.error('ERROR_getSpotifyArtist', error)
    }
    
    for (let i = 0; i < parseInt(findAlbums.data.items.length); i++) {
        if (findAlbums.data.items[i].images[1]) {
            findAlbums.data.items[i].picture = findAlbums.data.items[i].images[1].url
        }
    }
    return findAlbums.data.items;
}

var root = {
    // token: postSpotifyToken,
    search: getSpotifyArtist,
    albums: getSpotifyAlbums
};

// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));