import webpack from 'webpack';
import path from 'path';

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const env = process.env.NODE_ENV || 'development';

const config = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: env === 'production' ? '[name].[chunkhash].js' : '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

export default config;
