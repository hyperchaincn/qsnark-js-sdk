var path = require('path');

module.exports = {
    mode: 'production',
    entry: './index.js',
    devtool:'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js-qsnark-sdk.js',
        library: 'qsnark',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ]
    },
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
      }
};