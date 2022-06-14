<template>
    <v-row
        align="center"
        justify="center"
        :class="hasClass ? 'no-data-container' : ''"
    >
        <v-col cols="12">
            <v-card outlined class="text-center" color="transparent">
                <v-img :src="image" width="250" class="mx-auto my-8"></v-img>

                <v-card-text
                    class="
                        text-subtitle-2 text-md-subtitle-1 text-uppercase
                        font-weight-medium
                    "
                >
                    {{ message }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        hasClass: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: "/img/bg-empty.svg",
        },
        message: {
            type: String,
            default: "",
            required: true,
        },
    },
};
</script>

<style scoped>
.no-data-container {
    height: 60vh;
}
</style>
