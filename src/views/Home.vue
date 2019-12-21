<template>
  <div>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subtitle }}</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" lg="4">
            <img :src="preview_src" width="100%" style="max-width: 380px; max-height: 480px" id="preview_img">
          </v-col>

          <v-col cols="12" lg="6">
            <v-file-input prepend-icon="camera" type="file" accept="image/*" label="Input image" v-on:change="updatePreview"></v-file-input>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import axios from 'axios'

  const SERVER_URL = "http://127.0.0.1:5000/simulate";

  export default {
    name: 'home',
    data(){
      return {
        title : "Upload a photo of you sitting",
        subtitle : "Please relax and sit as how you usually do",
        preview_src : "img/img_sitting.webp",
        posture_msg : {
          "good_posture" : ["You have good posture!!", "Upload another photo"],
          "bad_posture" : ["Oops, your posture seems bad", "Please consult a chiropractor, or upload another photo "],
          "loading_posture" : ["Analyzing posture", "Sit tight!!"]
        },
      }
    },
    methods : {
      updatePreview(e) {
        this.preview_src = URL.createObjectURL(e);
        this.predict(e);
      },
      predict(posture_image) {
        this.updateHeader("loading_posture");
        let data = new FormData();
        data.append('file', posture_image, posture_image.filename);
        axios.post(SERVER_URL, data)
          .then(response => {
            let a = (response.data.posture === "bad") ? "bad_posture" : "good_posture";
            this.updateHeader(a);
          });
      },
      updateHeader(val){
        this.title = this.posture_msg[val][0];
        this.subtitle = this.posture_msg[val][1];
      }
    },
    mounted() {

    }
  }
</script>
