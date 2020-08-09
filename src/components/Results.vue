<template>
    <div>
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

        <p class="display-1" v-else>No posture/human detected in this image</p>
        <v-btn v-if="!timeline_mode" text small class="orange--text" to="/info#results-interpret">What do these results mean?</v-btn><br>

        <v-btn v-if="!timeline_mode" class="mt-6" v-on:click="$emit('new_posture')" x-large outlined>New Posture</v-btn>
    </div>
</template>

<script>
    export default {
        name: "Results",
        props: ['posture_result', 'timeline_mode'],
    }
</script>
