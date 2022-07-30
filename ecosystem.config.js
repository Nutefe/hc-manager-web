module.exports = {
    apps: [
        {
            name: 'hc-manager-web',
            exec_mode: 'cluster',
            instances: 'max', // Ou un certain nombre d'instances
            script: './node_modules/nuxt/bin/nuxt.js',
            cwd: '/var/www/nuxt/hc-manager-web',
            args: 'start'
        }
    ]
}
