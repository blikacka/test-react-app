/* eslint-disable no-console */
const gulp = require('gulp')
const sass = require('gulp-sass')
const sassVars = require('gulp-sass-vars')
const runSequence = require('gulp4-run-sequence')
const htmlmin = require('gulp-htmlmin')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const named = require('vinyl-named')
const hologram = require('gulp-hologram')
const template = require('gulp-template')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackDevServer = require('webpack-dev-server')
const path = require('path')
const gutil = require('gulp-util')
const del = require('del')
const yargs = require('yargs')
const noop = require('gulp-noop')
const yaml = require('js-yaml')
const fs = require('fs')
const gulpYaml = require('gulp-yaml')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HappyPack = require('happypack')

const port = 8081
const appVersion = (typeof (yargs.argv.appVersion) !== 'undefined') ? yargs.argv.appVersion : 'dev'
let platform = (typeof (yargs.argv.platform) !== 'undefined') ? yargs.argv.platform : 'base'

let development = false

const nodeModulesToTranspile = [
    'split-on-first',
    'strict-uri-encode',
]

const AVAILABLE_LANGUAGES = ['/cs/', '/en/']

/**
 * @returns {string[]} Paths to node modules, which are supposed to be transpiled
 */
const nodeModulesToTranspilePaths = () => nodeModulesToTranspile.map(module => path.join(__dirname, 'node_modules', module))

let webpackConfig = {
    mode: 'production',
    output: {
        path: path.join(__dirname, 'public/js'),
        publicPath: '/js/',
        chunkFilename: `${platform}-[name]-${appVersion}.bundle.js`,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, 'src'),
                    ...nodeModulesToTranspilePaths(),
                ],
                use: [
                    {
                        loader: 'happypack/loader?id=jsx',
                    },
                ],
            },
            {
                test: /\.(png|jp(e*)g|gif|svg)$/,
                use: [
                    {
                        loader: 'happypack/loader?id=pictures',
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'happypack/loader?id=raw',
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'moment': 'window.moment',
            'jQuery': 'window.jQuery',
            'jquery': 'window.jQuery',
            'aws-amplify': 'window["aws-amplify"]',
        },
        symlinks: false,
        cacheWithContext: false,
    },
    externals: [
        {
            'moment': 'moment',
            'jQuery': 'jQuery',
            'jquery': 'jQuery',
            'aws-amplify': 'window["aws-amplify"]',
        },
    ],
    plugins: [
        new webpack.ProvidePlugin({
            // inject ES5 modules as global vars
            $: 'jQuery',
            jQuery: 'jQuery',
            'window.jQuery': 'jQuery',
            jquery: 'jQuery',
            'window.jquery': 'jQuery',
            'aws-amplify': 'aws-amplify',
            'window["aws-amplify"]': 'aws-amplify',
        }),
        new HappyPack({
            id: 'jsx',
            threads: 2,
            loaders: [
                {
                    loader: 'babel-loader',
                    query: 'cacheDirectory',
                    options: require('./.babelrc.js'),
                },
            ],
        }),
        new HappyPack({
            id: 'pictures',
            threads: 2,
            loaders: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            ],
        }),
        new HappyPack({
            id: 'raw',
            threads: 1,
            loaders: [
                {
                    loader: 'raw-loader',
                },
            ],
        }),
    ],
}

gulp.task('sass', () => gulp
    .src([`src/css/app-${platform}.scss`])
    .pipe(named())
    .pipe(sassVars({
        appVersion: appVersion,
    }, { verbose: true }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css')))

gulp.task('cssmin', () => gulp
    .src(['public/css/*.css', '!public/css/*.min.css'])
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(development ? noop() :
        cssnano({
            reduceIdents: false,
            autoprefixer: false,
        })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('public/css')))

gulp.task('css', done => runSequence('sass', 'cssmin', done) )

// Documentation
gulp.task('hologram', () => gulp.src('docs/hologram/config.yml').pipe(
    hologram({
        bundler: true,
        logging: true,
    })
))

gulp.task('js', () => {
    let myConfig = Object.assign({}, webpackConfig)

    if (development) {
        myConfig.plugins = myConfig.plugins.concat([
            new HardSourceWebpackPlugin({
                cachePrune: {
                    sizeThreshold: 50 * 1024 * 1024,
                },
                cacheDirectory: path.join(__dirname, 'node_modules/.cache/hardsource/[confighash]'),
                recordsPath: path.join(__dirname, 'node_modules/.cache/hardsource/[confighash]/records.json'),
            }),
        ])
    } else {
        myConfig.plugins = myConfig.plugins.concat([
            new webpack.SourceMapDevToolPlugin({
                filename: platform + '-[name].' + appVersion + '.js.map',
                exclude: /node_modules/,
                append: '//# sourceMappingURL=[url]',
                test: /\.jsx?|\.js?$/,
                columns: true,
            }),
        ])
    }

    return gulp
        .src([`src/app-${platform}.js`])
        .pipe(named())
        .pipe(
            webpackStream(myConfig, webpack),
        )
        .on('error', err => {
            console.log(err.toString())
        })
        .pipe(gulp.dest('public/js'))
})

gulp.task('server', () => {
    let myConfig = Object.assign({}, webpackConfig)

    myConfig.devtool = '#eval-source-map'

    myConfig.entry = [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:' + port,
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        `./src/app-${platform}.js`,
    ]

    myConfig.plugins = myConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
    ])

    // Start a webpack-dev-server
    return new webpackDevServer(webpack(myConfig), {
        publicPath: '/' + myConfig.output.publicPath,
        stats: {
            colors: true,
        },
        contentBase: 'public/',
        hot: true,
        historyApiFallback: true,
        disableHostCheck: true,
    }).listen(port, 'localhost', err => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err)
        }

        gutil.log('[webpack-dev-server]', `http://localhost:${port}`)
    })
})

const loadDevStream = (stream, language) => {
    let outputTemplate = {
        VERSION: '@dev',
        PLATFORM: platform,
        TITLE: platform,
        DESCRIPTION: '',
        LANGUAGE: language,

        GITHUB_GRAPH_URL: 'https://api.github.com/graphql',
        ROBOTS: 'noindex, nofollow',

        FRONTEND_URL: 'https://www.xx.local',
        GITHUB_CLIENT_ID: '',
        GITHUB_CLIENT_SECRET: '',
    }

    // Apply local config if exists
    try {
        const localDoc = yaml.safeLoad(fs.readFileSync('config.local.yaml', 'utf8'))
        outputTemplate = Object.assign({}, outputTemplate, localDoc)
    } catch (e) {
        console.info('File "config.local.yaml" not found or is not valid. Using default sandbox configuration...')
    }

    return stream.pipe(template(outputTemplate))
}

const htmlMinFunction = language => {
    let stream = gulp.src(['*.html'])

    // @TODO - now is build running locally, on CI deploy is unwanted pass local variables
    // if (development) {
        stream = loadDevStream(stream, language.replace('/', '').replace('/', ''))
    // }

    return stream
        .pipe(htmlmin({
            collapseWhitespace: false,
            minifyJS: true,
        }))
        .pipe(gulp.dest(`public${language}`))
}

const translateLanguageFunction = language => (
    gulp.src(`./src/locales${language}*.yaml`)
        .pipe(gulpYaml({
            schema: 'DEFAULT_SAFE_SCHEMA',
            space: 4,
        }))
        .pipe(gulp.dest(`./src/locales${language}generated`))
)

gulp.task('htmlmin', () => {
    const streams = [...AVAILABLE_LANGUAGES, '/'].map(htmlMinFunction)

    return Promise.all(streams)
})

gulp.task('translate-languages', () => {
    const streams = AVAILABLE_LANGUAGES.map(translateLanguageFunction)

    return Promise.all(streams)
})

gulp.task('clean-build-folders', () => del(['public/css/**/*', 'public/js/**/*']))

gulp.task('watch', () => {
    gulp.watch(['src/**/*.scss'], {
        interval: 1500,
        usePolling: true,
    }, gulp.series(['css'])),
    gulp.watch(['src/locales/**/*.yaml'], {
        interval: 1500,
        usePolling: true,
    }, gulp.series(['translate-languages'])),
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], {
        interval: 1500,
        usePolling: true,
    }, gulp.series(['js']))
    return gulp.watch(['*.html'], {
        interval: 1500,
        usePolling: true,
    }, gulp.series(['htmlmin']))
})

const baseSequence = () => runSequence(['css', 'translate-languages', 'js', 'htmlmin'], ['watch', 'server'])
const productionSequence = () => Promise.resolve(runSequence(['css', 'translate-languages'], ['js', 'htmlmin']))

gulp.task('default', () => {
    development = true
    webpackConfig.mode = 'development'

    return baseSequence()
})

gulp.task('production', productionSequence)

