var webpack = require('webpack');

module.exports = {
    entry: "./public/js/app.js",
    output: {
        path: "./public/js/prod",
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
        }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin()
    ]
};