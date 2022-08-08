import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import fr from "vuetify/src/locale/fr.ts";

export default {
    lang: {
        current: "fr",
        locales: { fr },
    },
    theme: {
        light: true,
        icons: {
            iconfont: 'mdi', // default - only for display purposes
        },
        themes: {
            light: {
                primary: '#00a8a0',
                secondary: '#137b76',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                editIcone: '#0082ff',
                cashIcone: '#8d00ff',
            },
            dark: {
                primary: '#00a8a0',
                secondary: '#137b76',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                editIcone: '#0082ff',
                cashIcone: '#8d00ff',
            },
        },
    },
    // theme: {
    //     themes: {
    //         light: {
    //             primary: "#0b7557",
    //             secondary: "#262626",
    //             accent: "#0fa379",
    //             error: "#FF5252",
    //             info: "#2196F3",
    //             success: "#4CAF50",
    //             warning: "#FB8C00",
    //         },
    //         dark: {
    //             primary: "#0b7557",
    //             secondary: "#262626",
    //             accent: "#0fa379",
    //             error: "#FF5252",
    //             info: "#2196F3",
    //             success: "#4CAF50",
    //             warning: "#FB8C00",
    //         },
    //     },
    // },
};
