<template>
  <v-app id="app">
    <v-app-bar
      app
      color="#191414"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <router-link
          to="/"
          tag="span"
        >
          <span class="hidden-xs-only">Spotify x Kara.ai</span>
        </router-link>
      </v-toolbar-title>
      <v-form @submit.prevent="searchArtist()">
        <v-text-field
          v-model.trim="research"
          prepend-inner-icon="mdi-magnify"
          label="Search Artist"
          hide-details
          clearable
          solo-inverted
        />
      </v-form>
      <v-spacer></v-spacer>
      <v-btn
        href="https://open.spotify.com/"
        icon
        large
        class="ma-4 hidden-xs-only"
      >
        <v-avatar
          size="40px"
          item
        >
          <v-img
            src="https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png"
            alt=""
          ></v-img>
        </v-avatar>
      </v-btn>
      <span class="hidden-xs-only">x</span>
      <v-btn
        href="https://kara.ai/"
        icon
        large
        class="ma-4 hidden-xs-only"
      >
        <v-avatar
          size="40px"
          tile
          color="white"
        >
          <v-img
            src="https://kara.ai/wp-content/uploads/2019/09/logo_black_400x400.png"
            alt=""
          ></v-img></v-avatar>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container
        fluid
        class="background"
      >
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    research: '',
  }),
  methods: {
    searchArtist() {
      this.$router.push({ name: 'Search', params: { research: `${this.research}` } })
    }
  }
}
</script>