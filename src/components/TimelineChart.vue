<template>
    <v-card dark color="deep-orange" max-width="calc(100% - 32px)">
        <v-card-title>{{ pv }}</v-card-title>
        <v-card-text>
            <v-sparkline :labels="prediction_values[pv].map(p => p.time)" :value="prediction_values[pv].map(p => p.val)"
                         color="white" line-width="1" padding="12"></v-sparkline>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "TimelineChart",
        props: ["pv", "prediction_values"]
    }
</script>
