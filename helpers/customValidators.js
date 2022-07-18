import { helpers as vuelidateHelpers } from "vuelidate/lib/validators";
import moment from "moment";

// Username
export const usernameRegex = vuelidateHelpers.regex(
    "usernameRegex",
    /^(?=.*[a-zA-Z].*)(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
);

// Password
export const hasLowercase = vuelidateHelpers.regex("hasLowercase", /[a-z]/);

export const hasUppercase = vuelidateHelpers.regex("hasUppercase", /[A-Z]/);

export const hasNumber = vuelidateHelpers.regex("hasNumber", /\d/);

export const hasSpecial = vuelidateHelpers.regex(
    "hasSpecial",
    /[!@#$%^&*)(+=._-]/
);

// Lastname & Firstname
export const alphaSpace = vuelidateHelpers.regex("alphaSpace", /^[a-zA-Z ]*$/);

// Phone Number
export const phoneRegex = vuelidateHelpers.regex(
    "phoneRegex",
    /^(70|90|91|92|93|96|97|98|99)(\s\d{2}){3}$/
);

// Links
export const isFacebookLink = (value) =>
    !vuelidateHelpers.req(value) || value.includes("facebook.com");

export const isTwitterLink = (value) =>
    !vuelidateHelpers.req(value) || value.includes("twitter.com");

export const isBefore = (dateDebut, dateFin) => moment(dateDebut).isBefore(dateFin);

export const isDate = (dateDebut) => moment(dateDebut, "DD/MM/YYYY", true).isValid();
export const yaer = (dateNaiss) => moment().diff(dateNaiss, "years", true);
