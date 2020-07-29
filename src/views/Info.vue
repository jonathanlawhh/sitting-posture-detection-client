<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card outlined>
                    <v-card-title>Information zone</v-card-title>
                    <v-card-subtitle>Please feel free to contact me here if there are any queries.</v-card-subtitle>
                    <v-card-text>Quick jump:
                        <a href="#data-handling">Data Handling</a>,
                        <a href="#algorithm">Algorithm</a>,
                        <a href="#backend-server">Backend Server</a>,
                        <a href="#results-interpret">Results interpretation</a>,
                        <a href="#process-flow">Process Flow</a>,
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" lg="6">
                <v-card outlined id="data-handling">
                    <v-card-title>Data Handling</v-card-title>
                    <v-card-text><strong>NO</strong> uploaded images are being stored (permanently and temporarily) on the server.
                        Images are processed and returned as a base64 encoded string.<br>
                        Users activities on this site are not being tracked or monitored.</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" lg="6">
                <v-card outlined id="algorithm">
                    <v-card-title>Algorithm</v-card-title>
                    <v-card-text>The algorithm used to estimate the posture uses <a href="https://pjreddie.com/darknet/yolo/" target="_blank">YOLOv3</a> as the underlying model.
                        Transfer learning was performed on top of YOLOv3 with a custom dataset and optimized for this use case (posture detection).</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" lg="6">
                <v-card outlined id="backend-server">
                    <v-card-title>Backend Server</v-card-title>
                    <v-card-text>The backend was developed using Python3 and packaged using Docker.
                        Hosted on Google Cloud Run as a Docker container, the performance improved noticeably (3 - 5s -> 0.7s per detection on average) compared to hosting on a Linux VM.</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" lg="6">
                <v-card outlined id="results-interpret">
                    <v-card-title>What do the results means?</v-card-title>
                    <v-card-text>The web app will return one or more of the posture result in the table below.
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-left">Results</th>
                                    <th class="text-left">Interpretation</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="ri in results_interp" :key="ri.result">
                                    <td>{{ ri.result }}</td>
                                    <td>{{ ri.interp }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>

                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" lg="6">
                <v-card outlined id="process-flow">
                    <v-card-title>Process Flow</v-card-title>
                    <v-card-text>As stated in the data handling section, no information is being kept on the server. The process flow below would help you to understand why!<br><br>

                        <v-timeline dense>
                            <v-timeline-item small>Upload a photo in the web app</v-timeline-item>
                            <v-timeline-item small>Web app sends the uploaded photo to the backend server</v-timeline-item>
                            <v-timeline-item small>Backend processes the uploaded photo into an image array and applies image enhancement/s on it</v-timeline-item>
                            <v-timeline-item small>Image array is being sent to the prediction engine</v-timeline-item>
                            <v-timeline-item small>Prediction engine returns the results with the image array that has bounding boxes on it</v-timeline-item>
                            <v-timeline-item small>Image array is converted to base64, joined with the results as a JSON response and returned to this web app</v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>

<script>
    export default {
        name: "Info",
        data() {
            return {
                results_interp: [
                    { result: "neck_good/bad", interp: "neck_good indicates the subject neck is straight/looking forward, whereby neck_bad usually occurs in scenarios where the subject is looking down, or tilting the head" },
                    { result: "backbone_good/bad", interp: "backbone_good indicates the subject is sitting straight, whereby backbone_bad indicates the subject is slouching or leaning sideways" },
                    { result: "buttocks_good/bad", interp: "buttocks_good indicates the subject is sitting straight, whereby backbone_bad indicates the subject is slouching or leaning sideways" },
                ]
            }
        }
    }
</script>

<style scoped>

</style>