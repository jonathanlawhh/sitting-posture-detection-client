<template>
  <v-app>
    <v-container>
      <v-app-bar max-height="64" flat color="white">
        <div class="text-center hidden-lg-and-up">
          <v-btn color="blue" dark @click="sheet = !sheet" icon><v-icon>menu</v-icon></v-btn>
          <v-bottom-sheet v-model="sheet">
            <v-sheet height="200px">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h2>Navigation</h2>
                  </v-col>
                  <v-col cols="6" class="text-center" v-for="nav in navigations" v-bind:key="nav.url">
                    <v-btn x-large outlined :to="nav.url" v-on:click="sheet = !sheet">{{ nav.name }}</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
          </v-bottom-sheet>
        </div>

        <h2>Sitting Posture Identifier</h2>
        <v-spacer></v-spacer>
        <div class="hidden-md-and-down" v-for="nav in navigations" v-bind:key="nav.url">
          <v-btn style="margin-left: 24px;" outlined :to="nav.url">{{ nav.name }}</v-btn>
        </div>
      </v-app-bar>

      <router-view style="margin-bottom: 64px;"></router-view>

      <Footer></Footer>

    </v-container>
  </v-app>
</template>

<script>
  const Footer = () => import('./components/Footer');

  export default {
    components: {
      Footer
    },
    data () {
      return {
        sheet: false,
        navigations: [
          { url: "/", name: "Home" },
          { url: "/info", name: "Info" },
        ]
      }
    }
  }
</script>

<style>
  .v-toolbar__content{
    padding-left: 0 !important;
  }

  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(200px);
    opacity: 0;
  }

  .v-btn--active {
    background-color: rgba(0, 0, 0, 0.87) !important;
  }

  .v-btn--active .v-btn__content {
    color: rgb(255, 255, 255) !important;
  }
</style>
