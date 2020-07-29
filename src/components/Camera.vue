<template>
    <v-row>
        <v-col cols="12" style="position: relative">
            <video id="videocam" width="100%" autoplay></video>
<!--                <img class="overlay" style="width: 90%" src="/img/image_framing.svg">-->
        </v-col>

        <v-col cols="12">
            <v-row class="text-center" align="center">
                <v-col cols="4">
                    <v-btn class="grey darken-4 side-buttons" outlined dark fab v-on:click="switchUpload"><v-icon style="height: 60px; font-size: 30px;">image</v-icon></v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn class="grey darken-4" style="height: 90px; width: 90px;" dark fab v-on:click="takePicture"><v-icon style="height: 90px; font-size: 110px;">adjust</v-icon></v-btn>
                </v-col>
                <v-col cols="4">
                    <v-btn class="grey darken-4 side-buttons" outlined dark fab v-on:click="switchCamera"><v-icon style="height: 60px; font-size: 30px;">camera_front</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Camera",
        data(){
            return {
                devices : [],
                vidConstraints : { video: true }
            }
        },
        methods:{
            init(){
                if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                    this.startStream();
                } else {
                    alert("no camera");
                }
            },
            startStream(){
                navigator.mediaDevices.getUserMedia(this.vidConstraints)
                    .then(stream => {
                        let videoPlayer = document.querySelector('video');
                        videoPlayer.srcObject = stream;
                        videoPlayer.play();
                    })
            },

            stopStream(){
                navigator.mediaDevices.getUserMedia(this.vidConstraints)
                    .then(stream => {
                        stream.getTracks()[0].stop();
                    });
            },

            async getDevices(){
                await navigator.mediaDevices.enumerateDevices().then(devices => {
                    // devices = devices.filter(device => device.kind === 'videoinput');
                    for(let i = 0; i < devices.length; i++){
                        this.devices.push(devices[i]);
                        // devices[i].label.includes("back") && this.devices.push(devices[i].deviceId) && this.devices.push(devices[i]);
                    }
                });
            },

            switchCamera(){
                this.vidConstraints.video.facingMode.exact = (this.vidConstraints.video.facingMode.exact === 'user' ) ? 'environment' : 'user';
                this.stopStream();
                this.startStream();
            },


            takePicture(){
                this.$emit('takePicture');
            },

            switchUpload(){
                this.stopStream();
                this.$emit('switchUpload');
            }

        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .overlay{
        position: absolute;
        left: 10px;
        width: 300px;
        z-index: 2;
    }

    .side-buttons{
        height: 60px;
        width: 60px;
    }
</style>