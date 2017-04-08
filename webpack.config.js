const path = require('path');
const webpack = require('webpack');

module.exports = function () {
  return {
    entry: './client development/index.js',
    output: {
      path: path.join(__dirname, '/server/static/js'),
      filename: 'bundle.min.js'
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              /*
              options: {
                presets: ["es2015", "stage-0", "react"]
              }
              */
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack
        .optimize
        .UglifyJsPlugin({
          sourceMap: 'hidden-source-map',
          output: {
            comments: false
          }
        })
    ]
  };
};
