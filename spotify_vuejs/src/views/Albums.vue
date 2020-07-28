<template>
  <v-container fluid>
    <span class="text-h4">Albums de {{ artistName }}</span>
    <div
      v-if="searchAlbums"
    >
      <br><br>
      <div v-for="album in searchAlbums"
        :key="album.id"
      >
        <v-row justify="center"><span class="text-h5 font-italic font-weight-medium">{{ album.name }}</span></v-row>
        <v-row justify="center"><span class="text-subtitle-1 font-italic font-weight-light">({{ album.release_date }})</span></v-row>
        <v-row justify="center" align="center">
          <v-col cols="5" class="hidden-xs-only">
            <v-img 
              :src="`${album.picture}`" 
              contain
            />
          </v-col>
          <player spotifyCategory="album" :uri="`${album.uri}`" />
        </v-row>
        <br><br>
      </div>
    </div>
  </v-container>
</template>

<script>
import player from '../components/play-button-spotify.vue'

export default {
  components: {
    player
  },
  props: {
    artistId: {
      type: String,
      required: true
    },
    artistName: {
      type: String,
      default: 'Albums de l\'artiste'
    }
  },
  data () {
    return {
      searchAlbums: null,
    }
  },
  beforeMount(){
    this.getAlbums(`
      query {
        albums(artist: "${this.artistId}") {
          id
          name
          release_date
          uri
          picture
        }
      }
    `)
  },
  methods: {
    getAlbums(query) {
      fetch(`http://localhost:4000/graphql`, {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json', 
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          query: query
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          console.log('data returned:', data.data.albums)
          this.searchAlbums = data.data.albums
        } else {
          this.searchAlbums = "No result. Please try again !"
        }
      });
    }
  }
}
</script>