const path = require('path');

module.exports = {
  entry: './client/',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    // contentBase: __dirname,
    publicPath: '/build/',
    // proxy: {
    //   '/': 'http://localhost:3000',
    // },
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          }
        }
      },
    ],
  },
}
