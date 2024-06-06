const {    defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,

    devServer:{
      proxy:'http://shuttle.dev2.rastreo.gs:9000'
    }

})