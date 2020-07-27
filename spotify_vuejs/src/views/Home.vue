<template>
  <v-container fluid>
    <v-img
      src="https://www.desfenetressurlemonde.com/wp-content/uploads/2019/01/Des-Fenetres-sur-le-Monde-White-Sands-NM-Nouveau-Mexique-USA-24.jpg"
      min-height="100%"
      style="opacity: 0;"
    >
      <span class="text-h4">{{ welcomeMessage }}</span><br><br>
    </v-img>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      welcomeMessage: ''
    }
  }
}
</script>