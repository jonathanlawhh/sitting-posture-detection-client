<template>
    <div>
        <v-row>
            <v-col cols="12">
                <h2>Timeline mode</h2>
            </v-col>
            <v-col cols="12">
                <p>Set an interval (min 1 minute), and timeline mode will analyze your posture over time.</p>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6" lg="4">
                <Camera v-on:capturedImage="capturedImage" :timeline_mode="true" v-bind:capture="capture_image" v-on:timelineCaptured="capture_image = false"></Camera>
            </v-col>

            <v-col cols="12" md="6" lg="8">
                <v-row>
                    <v-col cols="12" v-if="timeline_start">
                        <h4>Running...</h4>
                    </v-col>
                    <v-col cols="6" md="4">
                        <v-text-field :disabled="timeline_start" label="minute" color="black" outlined type="number" v-model="minutes"></v-text-field>
                    </v-col>
                    <v-col cols="6" md="8">
                        <v-btn outlined :color="(timeline_start) ? 'red' : 'dark'" x-large v-on:click="toggleTimeline">{{ (timeline_start) ? 'STOP' : 'START' }}</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h3>Timeline results</h3>
            </v-col>
            <v-col cols="12" lg="6">
                <v-row>
                    <v-col cols="12" v-for="(pv, i) in Object.keys(prediction_values)" v-bind:key="i">
                        <v-card dark color="deep-orange" max-width="calc(100% - 32px)">
                            <v-card-title>{{ pv }}</v-card-title>
                            <v-card-text>
                                <v-sparkline :labels="prediction_values[pv].map(p => p.time)" :value="prediction_values[pv].map(p => p.val)"
                                             color="white" line-width="1" padding="12"></v-sparkline>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" lg="6">
                <v-card>
                    <v-tabs dark background-color="black darken-3" show-arrows v-model="tab">
                        <v-tabs-slider color="black lighten-3"></v-tabs-slider>
                        <v-tab v-for="ti in timeline_results" :key="ti.title">
                            {{ ti.title }}
                        </v-tab>

                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="ti in timeline_results" :key="ti.title">
                                <v-card flat>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" md="6" lg="4">
                                                <v-img contain max-height="480" :src="ti.image"></v-img>
                                            </v-col>

                                            <v-col cols="12" md="6" lg="6">
                                                <Results v-bind:posture_result="ti.prediction" :timeline_mode="true"></Results>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-card>
            </v-col>

        </v-row>
    </div>

</template>

<script>
    const MIN_GAP = 1;

    import axios from "axios";
    import { dataURLtoFile } from '../functions/common_functions';
    const Camera = () => import('../components/Camera');
    const Results = () => import('../components/Results');

    export default {
        name: "Timeline",
        components: {
            Results, Camera
        },
        data() {
            return {
                tab: null,
                timeline_results: [],
                prediction_values: { backbone: [], neck: [], buttocks: [] },
                capture_image: false,
                minutes: MIN_GAP,
                interval_function: new Function(),
                timeline_start: false,
            }
        },
        methods: {
            predict(e) {
                if (e !== undefined){
                    let form = new FormData();
                    form.append("file", e);

                    axios.post(process.env.VUE_APP_API_SERVER + "/api/predict", form, {
                        headers: {
                            'Content-Type': e.type
                        }
                    }).then((r) => {
                        let d = new Date();
                        let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                        let prediction_results = JSON.parse(r.data[0].prediction);

                        this.timeline_results.push({
                            "title": time,
                            "prediction": prediction_results,
                            "image": 'data:image/png;base64,' + r.data[0].image
                        });

                        this.loadPredictionValue(prediction_results, time);
                        this.tab = this.timeline_results.length - 1;
                    }).catch((e) => {
                        alert(e)
                    });
                }
            },

            capturedImage(im){
                (im !== null) && this.predict(dataURLtoFile(im, 'tmp.png'));
            },

            startTimeline(){
                this.minutes = (this.minutes >= MIN_GAP) ? this.minutes : MIN_GAP
                this.timeline_results = [];
                this.prediction_values = { backbone: [], neck: [], buttocks: [] };

                this.timeline_start = true;
                this.capture_image = true;
                this.interval_function = setInterval(() => {
                    this.capture_image = true;
                }, this.minutes * process.env.VUE_APP_TIMEOUT_INTERVAL * 1000)
            },

            stopTimeline(){
                this.timeline_start = false;
                clearInterval(this.interval_function);
            },

            toggleTimeline(){
                this.timeline_start ? this.stopTimeline() : this.startTimeline();
            },

            loadPredictionValue(predictions, time){
                for(let i = 0; i < predictions.length; i++){
                    let cat = predictions[i][0].split("_")
                    this.prediction_values[cat[0]].push({ 'time': time, 'val': (cat[1] === 'good') ? 1 : 0 })
                }
            }
        }
    }
</script>
