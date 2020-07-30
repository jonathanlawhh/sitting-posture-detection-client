<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="12" style="position: relative">
                    <video width="100%" id="videocam" autoplay></video>
<!--                            <img class="overlay" style="width: 90%" src="/img/image_framing.svg">-->
                </v-col>

                <v-col cols="12">
                    <v-row class="text-center" align="center">
                        <v-col cols="4">
                            <v-btn class="grey darken-4 side-buttons" outlined dark fab v-on:click="destroy">
                                <v-icon style="height: 60px; font-size: 30px;">close</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn class="grey darken-4" style="height: 90px; width: 90px;" dark fab v-on:click="takePicture">
                                <v-icon style="height: 90px; font-size: 110px;">adjust</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="4" v-if="this.devices.length > 1">
                            <v-btn class="grey darken-4 side-buttons" outlined dark fab v-on:click="switchCamera">
                                <v-icon style="height: 60px; font-size: 30px;">camera_front</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
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
            startStream(){
                navigator.mediaDevices.getUserMedia(this.vidConstraints)
                    .then(stream => {
                        let videoPlayer = document.querySelector('video');
                        videoPlayer.srcObject = stream;
                        videoPlayer.play();
                    })
            },

            stopStream(){
                let tracks = document.querySelector('video').srcObject.getTracks();
                tracks.forEach(track => track.stop())
            },

            async getDevices(){
                await navigator.mediaDevices.enumerateDevices().then(devices => {
                    this.devices = devices.filter(device => device.kind === 'videoinput');
                });
            },

            switchCamera(){
                if (this.devices.length > 1){
                    this.vidConstraints.video.facingMode.exact = (this.vidConstraints.video.facingMode.exact === 'user' ) ? 'environment' : 'user';
                    this.stopStream();
                    this.startStream();
                }
            },

            takePicture(){
                let video = document.querySelector('video');
                let canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

                this.destroy();
                this.$emit('capturedImage', canvas.toDataURL('image/png'));
            },

            destroy(){
                this.stopStream();
                this.$emit('capturedImage', null);
            }
        },
        mounted() {
            if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
                this.startStream();
                this.getDevices();
            } else {
                alert("no camera");
            }
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