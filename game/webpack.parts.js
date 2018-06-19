exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options,
                },
            },
        ],
    },
});