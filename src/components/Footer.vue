<template>
    <v-footer height="auto" style="bottom: 0;" absolute>
        <v-container>
            <v-row>
                <v-col cols="6">
                    Jonathan Law
                </v-col>

                <v-spacer></v-spacer>

                <v-btn color="deep-orange" dark :icon="$vuetify.breakpoint.mobile" href="https://github.com/jonathanlawhh/posture-detection-backend" target="_blank"><v-icon>code</v-icon>
                    <span v-if="!$vuetify.breakpoint.mobile">Source Code</span>
                </v-btn>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>
