<template>
  <div>
    <v-row>
      <v-col cols="12">
        <TLDR v-if="!$vuetify.breakpoint.mobile"></TLDR>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="5" lg="4" class="text-center">
        <v-img :src="preview_src" class="display-img" crossorigin='anonymous' contain>
          <template v-if="processing === 1">
            <v-row class="fill-height ma-0 loading-bg" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>

      <v-col cols="1" class="hidden-md-and-down">
        <v-divider vertical></v-divider>
      </v-col>

      <v-col cols="12" md="6" lg="7">
        <v-row>
          <v-col cols="12">
            <h3>{{ header_messages[processing][0] }}</h3>
            <small>{{ header_messages[processing][1] }}</small>
          </v-col>

          <transition name="slide-fade">
            <v-col cols="12" lg="7" v-if="processing === 0">
              <v-file-input prepend-icon="attach_file" type="file" accept="image/*" label="Input image"
                            v-on:change="predict" outlined camera></v-file-input>

              <v-spacer></v-spacer>

              <v-btn style="width: 100%;" outlined x-large @click="camera_dialog = !camera_dialog">
                <v-icon left>camera</v-icon> Camera
              </v-btn>
              <v-dialog v-model="camera_dialog" max-width="720">
                <Camera v-if="camera_dialog" v-on:capturedImage="capturedImage"></Camera>
              </v-dialog>

            </v-col>

            <v-col cols="12" lg="7" v-if="processing === 2" id="posture_results">
              <Results v-bind:posture_result="posture_result" v-on:new_posture="resetSite"></Results>
            </v-col>
          </transition>

        </v-row>
      </v-col>

    </v-row>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snack_msg }}
    </v-snackbar>

  </div>
</template>

<script>
  import axios from 'axios'
  import { dataURLtoFile } from '../functions/common_functions'

  const Results = () => import('../components/Results');
  const TLDR = () => import('../components/TLDR');
  const Camera = () => import('../components/Camera');

  export default {
    name: 'home',
    components: {
      TLDR, Results, Camera
    },
    data(){
      return {
        camera_dialog: false,
        snackbar: false,
        snack_msg: "",
        header_messages: [
          ["Snap or upload a pic!", "And our robots will process it"],
          ["Processing...", "Our robots are on it"],
          ["Done!!", "Here is what our robots has to say:"]
        ],
        preview_src : "/img/img_sitting.svg",
        posture_result : [],
        processing : 0
      }
    },
    methods : {
      predict(e) {
        if (e !== undefined){
          this.processing = 1;
          this.preview_src = URL.createObjectURL(e);

          let form = new FormData();
          form.append("file", e);

          axios.post(process.env.VUE_APP_API_SERVER + "/api/predict", form, {
            headers: {
              'Content-Type': e.type
            }
          }).then((r) => {
            this.processing = 2;
            this.preview_src = 'data:image/png;base64,' + r.data[0].image;
            this.posture_result = JSON.parse(r.data[0].prediction);

            if(this.$vuetify.breakpoint.mobile){
              setTimeout(() => {
                this.$vuetify.goTo("#posture_results", { duration: 1000, easing: 'easeInOutCubic' } );
              }, 500)
            }

          }).catch((e) => {
            this.resetSite();
            this.snack_msg = e;
            this.snackbar = true;
          });
        }
      },

      capturedImage(im){
        this.camera_dialog = false;
        if (im !== null){
          this.preview_src = im;
          this.predict(dataURLtoFile(im, 'tmp.png'));
        }
      },

      resetSite(){
        this.posture_result = [];
        this.processing = 0;
        this.preview_src = "/img/img_sitting.svg";
      },
    }
  }
</script>

<style scoped>
  .display-img {
    max-width: 380px;
    max-height: 380px;
  }

  .loading-bg {
    background: rgba(33, 33, 33, 0.5);
  }
</style>
