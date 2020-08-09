<template>
    <v-app-bar max-height="64" flat color="transparent">
        <div class="text-center hidden-lg-and-up">
            <v-btn color="orange" @click="sheet = !sheet" icon><v-icon>menu</v-icon></v-btn>
            <v-bottom-sheet v-model="sheet">
                <v-sheet height="100%">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <h2>Navigation</h2>
                            </v-col>
                            <v-col cols="6" class="text-center" v-for="nav in navigations" v-bind:key="nav.url">
                                <v-btn x-large outlined :to="nav.url" v-on:click="sheet = !sheet">{{ nav.name }}</v-btn>
                            </v-col>

                            <v-col cols="12" class="text-center">
                                <v-btn style="width: 80%" x-large outlined v-on:click="toggleTheme">
                                    <v-icon left>{{ theme_icon[(this.$vuetify.theme.dark) ? 1 : 0] }}</v-icon> SWITCH THEME
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-sheet>
            </v-bottom-sheet>
        </div>

        <h2>Sitting Posture Identifier</h2>
        <v-spacer></v-spacer>
        <div class="hidden-md-and-down">
            <span v-for="nav in navigations" v-bind:key="nav.url">
                <v-btn class="ml-6" outlined :to="nav.url">{{ nav.name }}</v-btn>
            </span>
            <v-btn class="ml-6" v-on:click="toggleTheme" outlined><v-icon>{{ theme_icon[(this.$vuetify.theme.dark) ? 1 : 0] }}</v-icon></v-btn>
        </div>
    </v-app-bar>
</template>

<script>
    export default {
        name: "Header",
        data () {
            return {
                sheet: false,
                navigations: [
                    { url: "/", name: "Home" },
                    { url: "/timeline", name: "Timeline" },
                    { url: "/info", name: "Info" },
                ],
                theme_icon: ["brightness_2", "brightness_7"]
            }
        },
        methods: {
            toggleTheme(){
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            }
        }
    }
</script>
