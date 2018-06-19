const path = require('path'),
      NODE_ENV = process.env.NODE_ENV || 'development',
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
        library: "home"
    },
    module: {
        rules: [
            {
                test:/\.(ogg|wav)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'audio/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test:/\.css$/, use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader']
                    }
                )
            },
            {
                test: /\.(png|jp(e*)g|svg|psd)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    node: {
        fs: 'empty'
    },

    plugins: [
        new ExtractTextPlugin('style.css')
    ],

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "source-map": null
};

