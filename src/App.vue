<template>
  <v-app>
    <v-container>
      <Header></Header>

      <keep-alive>
        <router-view class="mb-16"></router-view>
      </keep-alive>

      <Footer></Footer>

    </v-container>
  </v-app>
</template>

<script>
  const Header = () => import('./components/Header');
  const Footer = () => import('./components/Footer');

  export default {
    components: {
      Header, Footer
    },
    metaInfo: {
      title: 'Sitting Posture Identifier',
      titleTemplate: 'SPI | %s'
    }
  }
</script>

<style>
  .v-toolbar__content {
    padding-left: 0 !important;
  }

  .v-btn--active {
    background-color: rgba(0, 0, 0, 0.87) !important;
  }

  .v-btn--active .v-btn__content {
    color: rgb(255, 255, 255) !important;
  }
</style>
