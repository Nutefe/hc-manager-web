export default ({ app, $auth }) =>
    $auth.onRedirect((to, from) => app.localePath(to));