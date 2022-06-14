<template>
    <v-row align="center">
        <v-col cols="auto">
            <h5 class="text-h5 text-uppercase font-weight-medium">
                {{ title }}
            </h5>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null,
        },
    },
};
</script>
