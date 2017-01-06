var webpack = require('webpack');

module.exports = {
    entry: "./public/js/recipe.js",
    output: {
        path: "./public/js/dev",
        filename: "bundle.js"
    },
    externals: { 
        "react": "React",
        "react-dom": "ReactDOM"
    },
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: [
                require.resolve('babel-preset-es2015'),
                require.resolve('babel-preset-react')
            ]
          }
        }, {
          test: /\.sass$/,
          loaders: ['style', 'css', 'sass']
        }]
    }
};