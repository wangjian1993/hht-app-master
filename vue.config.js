const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg|ttf|woff|eot)(\?.*)?$/i

module.exports = {
	pages: {
		index: {
			// 页面的入口
			entry: './src/pages/index/main.js',
			// 页面的模板
			template: './public/index.html',
			// build时输出的文件名
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: '智慧早教',
			// 在这个页面中包含的块，默认情况下会包含
		},
		// 对xyjVideo页面的配置
		course: {
			entry: './src/pages/xyj/main.js',
			template: './public/xyjVideo.html',
			filename: 'xyjVideo.html',
			title: '火火兔姐姐讲西游记',
		}
	},
	transpileDependencies: ['webpack-dev-server/client'],

	// 基本路径
	// baseUrl: './',
	publicPath:"./",
	// publicPath: process.env.NODE_ENV === 'development' ?
	// 	'./' : 'https://resource.alilo.com.cn/static/hht-app/',
	// 输出文件目录
	outputDir: 'dist',
	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,
	assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
	runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,

	chainWebpack: (config) => {
		// config.entry.app = ['babel-polyfill', './src/pages/index/main.js'];
		// 修复HMR
		// config.resolve.symlinks(true);
		//修复 Lazy loading routes Error
		// config.plugin('html').tap(args => {
		// 	args[0].chunksSortMode = 'none';
		// 	return args;
		// });
		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('layout', resolve('src/layout'))
			.set('base', resolve('src/base'))
			.set('static', resolve('src/static'))


		//压缩图片
		// config.module
		// 	.rule("images")
		// 	.use("image-webpack-loader")
		// 	.loader("image-webpack-loader")
		// 	.options({
		// 		mozjpeg: {
		// 			progressive: true,
		// 			quality: 65
		// 		},
		// 		optipng: {
		// 			enabled: false
		// 		},
		// 		pngquant: {
		// 			quality: [0.9, 0.98],
		// 			speed: 4
		// 		},
		// 		gifsicle: {
		// 			interlaced: false
		// 		}
		// 	});

		// 打包分析
		if (process.env.IS_ANALYZ) {
			config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
				analyzerMode: 'static',
			}, ])
		}
	},

	configureWebpack: (config) => {
		if (IS_PROD) {
			const plugins = []
			//开启 gzip 压缩
			plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: productionGzipExtensions,
					threshold: 10240,
					minRatio: 0.8,
				})
			)

			config.plugins = [...config.plugins, ...plugins]
		}
	},
	// css相关配置
	css: {
		extract: true,
		sourceMap: false,
		loaderOptions: {},
		modules: false,
	},
	parallel: require('os').cpus().length > 1,
	pwa: {
		iconPaths: {
			favicon32: 'favicon.ico',
			favicon16: 'favicon.ico',
			appleTouchIcon: 'favicon.ico',
			maskIcon: 'favicon.ico',
			msTileImage: 'favicon.ico'
		}
	},
	devServer: {
		//     open: true,
		//     host: 'localhost',
		//     port: 8080,
		//     https: false,
		//     hotOnly: false,
		//     proxy: null, // 设置代理
		//     before: app => {
		//     }
	},

	// 第三方插件配置
	pluginOptions: {},
}
