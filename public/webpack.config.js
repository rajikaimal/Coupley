var webpack = require('webpack');
var path = require('path');
var env = process.env.NODE_ENV || 'development';
var config = {
  entry: path.resolve(__dirname, 'js/app.js'),
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, // A regexp to test the require path. accepts either js or jsx
      loader: ['babel'], // The module to load. "babel" is short for "babel-loader"
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};

module.exports = config;


// module.exports = {
//   entry: './index.js',
//   output: {
//     filename: 'bundle.js'       
//   },
//   module: {
//     loaders: [
// 	  {
// 	    test: /.jsx?$/,
// 	    loaders: ['babel-loader', 'react-hot'],
// 	    query: {
//         	presets: ['es2015', 'react']
//         }
// 	  }
//     ]
//   }
// }