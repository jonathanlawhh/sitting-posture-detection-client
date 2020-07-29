<template>
  <v-app :dark="t" :style="(t) && 'background-color: #212121'">
    <v-container v-if="!t">
      <v-card class="container" :dark="t">
        <v-card-title class="text-left">
          <h3>Right Posture</h3>
        </v-card-title>
      </v-card>
    </v-container>

    <v-container :class="(t) && 'grey darken-4'">
      <router-view v-on:switchTheme="switchTheme"></router-view>
    </v-container>

  </v-app>
</template>

<script>

  export default {
    data () {
      return {
        t : false
      }
    },
    methods : {
      switchTheme(){
        this.t = !this.t;
      }
    },
    mounted() {

    }
  }
</script>
