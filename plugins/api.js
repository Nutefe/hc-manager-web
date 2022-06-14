import ApiService from "~/services/ApiService";

export default ({ $axios, $auth }, inject) =>
    inject("api", ApiService($axios, $auth));
