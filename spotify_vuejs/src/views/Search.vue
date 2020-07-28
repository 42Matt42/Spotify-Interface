<template>
  <v-container fluid>
    <span class="text-h4">Recherche d'artiste "{{ research }}"</span><br><br>
    <div
      v-if="searchArtist"
    >
      <div v-for="artist in searchArtist"
        :key="artist.id"
      >
        <router-link
          :to="{ name: 'Albums', params: { artistId: artist.id, artistName: artist.name } }"
          tag="span"
        >
          <v-row justify="center"><span class="text-h6 text-uppercase">{{ artist.name }}</span></v-row>
          <v-row justify="center"><span class="font-italic">{{ artist.followers.total }} fans</span></v-row>
          <v-row justify="center">
            <v-rating
              :value="`${artist.popularity}` / 20"
              length="5"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              readonly
            />
          </v-row>
        </router-link>
          <v-row justify="center" align="center">
            <v-col cols="5" class="hidden-xs-only">
              <router-link
                :to="{ name: 'Albums', params: { artistId: artist.id, artistName: artist.name } }"
                tag="span"
              >
                <v-img 
                  :src="`${artist.picture}`"
                  contain
                />
              </router-link>
            </v-col>
            <player spotifyCategory="artist" :uri="`${artist.uri}`" />
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
    research: {
      type: String,
      default: 'nothing'
    },
  },
  data () {
    return {
      searchArtist: null,
    }
  },
  beforeMount(){
    this.getSearch(`
      query {
        search(name: "${this.research}") {
          id
          name
          popularity
          picture
          uri
          followers {
            total
          }
        }
      }
    `)
  },
  watch: {
    research: function () {
      console.log(this.research)
      this.getSearch(`
      query {
        search(name: "${this.research}") {
          id
          name
          popularity
          picture
          followers {
            total
          }
        }
      }
    `)
    }
  },
  methods: {
    getSearch(query) {
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
        console.log('data returned:', data)
        if (data.data) {
          this.searchArtist = data.data.search
        } else {
          this.searchArtist = "No result. Please try again !"
        }
      });
    }
  }
}
</script>
