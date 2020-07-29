<template>
  <div>
    <transition name="fade" mode="out-in" cols="12">
      <v-row key="2">
        <v-col cols="12">
          <v-stepper v-model="e6" vertical>
            <v-stepper-step editable step="1">
              Upload a photo of you sitting
              <small>Please relax and sit as how you usually do</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-row>
                <v-col cols="12">
                  <img :src="preview_src" class="display-img" crossorigin='anonymous'>
                </v-col>
                <v-col cols="12" lg="5">
                  <v-file-input prepend-icon="attach_file" type="file" accept="image/*" label="Input image"
                                v-on:change="updatePreview" outlined camera></v-file-input>
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-step editable step="2">
              Results
              <small>How is your posture</small>
            </v-stepper-step>

            <v-stepper-content step="2">
              <v-row>
                <v-col cols="12">
                  <transition name="slide-fade">
                    <div class="text-center" v-if="resultant_img === 'loading'">
                      <p style="font-size: 140%">Our robots are analyzing your posture</p>
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>

                    <v-img max-height="400" contain v-else :src="resultant_img" ></v-img>
                  </transition>
                </v-col>

                <v-col cols="12">
                  <v-simple-table v-if="posture_result.length !== 0 ">
                    <thead>
                    <tr>
                      <th class="text-left">Part</th>
                      <th class="text-left">Confidence</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(p, i) in posture_result" :key="i">
                      <td>{{ p[0] }}</td>
                      <td>{{ p[1].toFixed(4) }}</td>
                    </tr>
                    </tbody>
                  </v-simple-table>

                  <h3 v-if="posture_result.length === 0 && resultant_img !== 'loading'" >No human/posture found by the algorithm</h3>
                </v-col>

                <v-col cols="12">
                  <v-btn class="teal darken-4 white--text" @click="resetSite">New posture</v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>

          </v-stepper>

        </v-col>

      </v-row>
    </transition>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snack_msg }}
    </v-snackbar>

  </div>
</template>

<script>
  const API_ENDPOINT = (process.env.NODE_ENV === 'development') ? "http://localhost:8080/" : "https://backend-api-ou7vebbxoq-nn.a.run.app/";
  import axios from 'axios'

  export default {
    name: 'home',
    data(){
      return {
        snackbar: false,
        snack_msg: "",
        e6: 1,
        preview_src : "img/img_sitting.webp",
        resultant_img: "",
        posture_result : [],
      }
    },
    methods : {
      updatePreview(e) {
        if (e !== undefined){
          let form = new FormData();
          form.append("file", e);

          this.resultant_img = "loading";
          this.posture_result = [];
          this.e6 = 2;

          axios.post(API_ENDPOINT + "/api/predict", form, {
            headers: {
              'Content-Type': e.type
            }
          }).then((r) => {
            this.resultant_img = 'data:image/png;base64,' + r.data[0].image;
            this.posture_result = JSON.parse(r.data[0].prediction);
          }).catch((e) => {
            this.resetSite();
            this.snack_msg = e;
            this.snackbar = true;
          });
        }
      },

      resetSite(){
        this.resultant_img = "";
        this.posture_result = [];
        this.e6 = 1;
      },

    }
  }
</script>

<style scoped>
  .slide-fade-enter-active {
    transform: translateY(200px);
    opacity: 0;
    transition: 1s ease;
  }
  .slide-fade-leave-active {
    transition-delay: 1s;
    transform: translateY(-200px);
    opacity: 0;
    transition: 1s ease-in-out;
  }

  .display-img {
    width: 100%;
    max-width: 380px;
    max-height: 380px;
  }
</style>