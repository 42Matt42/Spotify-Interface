<template>
    <iframe 
        :src="`https://open.spotify.com/embed/${spotifyCategory}/${uriSplit}`"
        width="280" 
        height="360" 
        frameborder="0" 
        allowtransparency="true" 
        allow="encrypted-media">
    </iframe>
</template>

<script>
export default {
  props: {
    id: {
        type: String,
        required: false
    },
    uri: {
        type: String,
        required: true
    },
    spotifyCategory: {
        type: String,
        required: true
    }
  },
  computed: {
    uriSplit() {
      if (this.uri) {
        return this.uri.split(':')[2]
      }
      return ''
    }
  }
}
</script>

<style scoped>
</style>
