<template>
  <v-app>
    <v-container>
      <v-card class="container">
        <v-card-title class="text-left">
          <h3>Right Posture</h3>
        </v-card-title>
      </v-card>
    </v-container>

    <v-container>
      <router-view></router-view>
    </v-container>

  </v-app>
</template>

<script>

  export default {
    data () {
      return {

      }
    },
    methods : {
      async doLogin(){

      }
    },
    mounted() {

    }
  }
</script>
