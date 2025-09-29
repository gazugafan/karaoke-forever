const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { LicenseWebpackPlugin } = require('license-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'production'
const __DEV__ = NODE_ENV === 'development'
const __TEST__ = NODE_ENV === 'test'
const __PROD__ = NODE_ENV === 'production'
const baseDir = path.resolve(__dirname, '..')

const config = {
  mode: __PROD__ ? 'production' : 'development',
  entry: {
    main: [
      './src/main.js',
      __DEV__ && 'webpack-hot-middleware/client', // keep only if you're using express+middleware, not WDS
    ].filter(Boolean),
  },
  output: {
    path: path.join(baseDir, 'build'),
    filename: __DEV__ ? '[name].js' : '[name].[contenthash].js',
    clean: true, // Webpack 5 built-in "clean" option
  },
  resolve: {
    modules: [
      path.join(baseDir, 'src'),
      'node_modules',
    ],
    alias: {
      '<PROJECT_ROOT>': baseDir,
      assets: path.join(baseDir, 'assets'),
      fonts: path.join(baseDir, 'docs', 'assets', 'fonts'),
      shared: path.join(baseDir, 'shared'),
    },
    symlinks: false,
  },
  module: { rules: [] },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__,
      __TEST__,
      __PROD__,
      __KF_VERSION__: JSON.stringify(process.env.npm_package_version),
      __KF_URL_HOME__: JSON.stringify('https://www.karaoke-forever.com'),
      __KF_URL_LICENSE__: JSON.stringify('/licenses.txt'),
      __KF_URL_REPO__: JSON.stringify('https://github.com/bhj/karaoke-forever/'),
      __KF_URL_SPONSOR__: JSON.stringify('https://github.com/sponsors/bhj/'),
      __KF_COPYRIGHT__: JSON.stringify(`2019-${new Date().getFullYear()} RadRoot LLC`),
    }),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: __DEV__ ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: __DEV__ ? '[id].css' : '[id].[contenthash].css',
    }),
    __DEV__ && new webpack.HotModuleReplacementPlugin(),
    __DEV__ && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: 'minimal',
}

// Production-only license plugin
if (__PROD__) {
  config.plugins.push(new LicenseWebpackPlugin({
    addBanner: true,
    outputFilename: 'licenses.txt',
    perChunkOutput: false,
    renderLicenses: (modules) => {
      let txt = ''
      modules.forEach(m => {
        if (!m.licenseText) return
        txt += '\n' + '*'.repeat(71) + '\n\n'
        txt += m.packageJson.name + '\n'
        txt += m.licenseText.replace(/(\S)\n(\S)/gm, '$1 $2')
      })
      return 'Karaoke Forever\n' + fs.readFileSync('./LICENSE', 'utf8') + txt
    },
  }))
}

// HTML Template
config.plugins.push(new HtmlWebpackPlugin({
  template: './src/index.html',
  base: '/',
}))

// Loaders
// ------------------------------------

// JavaScript / JSX
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: __DEV__,
      configFile: path.join(baseDir, 'config', 'babel.config.json'),
      plugins: [
        __DEV__ && require.resolve('react-refresh/babel'),
      ].filter(Boolean),
    },
  }],
})

// Global CSS (files matching *global.css)
config.module.rules.push({
  test: /(global)\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false, // no CSS Modules for global files
        sourceMap: __DEV__,
      }
    }
  ],
})

// CSS Modules (all .css except global)
config.module.rules.push({
  test: /\.css$/,
  exclude: /(global)\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          mode: 'local', // enable CSS Modules
          localIdentName: __DEV__ ? '[path][name]__[local]__' : '[hash:base64]',
          exportLocalsConvention: 'camelCaseOnly',
          exportOnlyLocals: false, // needed to generate a default export object
          namedExport:false
        },
      },
    },
  ],
})

// Asset Modules (replaces url-loader/file-loader)
config.module.rules.push(
  {
    test: /\.woff2(\?.*)?$/,
    type: 'asset/resource',
    generator: { filename: 'fonts/[name][ext]' }
  },
  {
    test: /\.svg(\?.*)?$/,
    type: 'asset/resource',
    generator: { filename: 'images/[name][ext]' }
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    type: 'asset',
    parser: { dataUrlCondition: { maxSize: 8 * 1024 } }, // inline <8kb, file otherwise
    generator: { filename: 'images/[name][ext]' }
  }
)

// Markdown
config.module.rules.push({
  test: /\.md$/,
  use: ['html-loader', 'markdown-loader']
})

module.exports = config
