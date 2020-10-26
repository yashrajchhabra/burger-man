

const vueCliConfig = {
    publicPath: '/',
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/styles/variables.scss";`
            }
        }
    }
};


module.exports = vueCliConfig;
