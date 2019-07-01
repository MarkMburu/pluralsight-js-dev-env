import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import WebpackMDHash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor:path.resolve(__dirname,'src/vendor'),  
    main:path.resolve(__dirname, 'src/index')
},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),   
      new WebpackMDHash(),
    //   use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they are cached  separately
    new webpack.optimize.CommonsChunkPlugin({
        name:'vendor'
    }),
    //create HTML file that includes reference to bundled js
      new HTMLWebpackPlugin({
          template:'src/index.html',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          },
          inject:true,
          trackJSToken: "88a33637eb6d42869c88927eebc9ff0a"
      }),
    //Eliminate duplicate packages when generating bundle
     new webpack.optimize.DedupePlugin(),

    //Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}