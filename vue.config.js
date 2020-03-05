// vue.config.js
const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// var build = require('./build');
// 用于做相应的 merge 处理
// const merge = require('webpack-merge');

const isProduction = process.env.NODE_ENV === 'production';

const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
    pages: {
        index: {
            // page 的入口
            entry: 'src/views/index.js',
            // 模板来源
            template: 'src/views/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '蛋蛋庄园',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            // chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: isProduction ? true : false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            // pass options to sass-loader
            // sass: {
            // 引入全局变量样式
            // data: `
            //     @import "@/stylePath/theme.scss;
            // `
            // }
        },
        // 启用 CSS modules for all css / pre-processor files.
        // https://wechat-1253215910.cos.ap-shanghai.myqcloud.com/js/xjcc/
        requireModuleExtension: false,
    },
    lintOnSave: false,
    // publicPath: process.env.NODE_ENV === 'production' ?
    //     'http://xjccfile.pceggs.com:8080/xjyx/game_cc/' : '/',
    publicPath: isProduction ?
        'http://xjccfile.pceggs.com:8080/xjyx/egg/js/' : '/',
    devServer: {
        open: true, // 是否自动打开浏览器页面
        host: '192.168.2.162', // 默认是 localhost
        port: 8082, // 端口地址
        https: false, // 使用https提供服务
        proxy: null,
        // proxy: {
        //     '/IFS': {
        //         target: 'http://apptest.pceggs.com', // 目标地址
        //         changeOrigin: true, // 是否改变源地址
        //         pathRewrite: {'^/IFS': ''}
        //     }
        // },
        // before: app => {},
        // historyApiFallback: {
        //     index: '/index.html'
        // },
        disableHostCheck: true,
    },
    productionSourceMap: false,
    chainWebpack: config => {
        // config
        //     .entry('index')
        //     .add('babel-polyfill')
        //     .end();
        // 配置别名
        config.resolve.alias
            .set('@', resolve('src'))
            // .set('_lib', resolve('src/common'))
            .set('_com', resolve('src/components'))
            // .set('_img', resolve('src/images'))
            .set('_cfg', resolve('src/config'))
        // 生产环境配置
        // if (isProduction) {
        //     // 删除预加载
        //     // config.plugins.delete('preload');
        //     // config.plugins.delete('prefetch');
        //     // 压缩代码
        //     config.optimization.minimize(true);
        //     // 分割代码
        //     config.optimization.splitChunks({
        //         chunks: 'all'
        //     })
        // }
    },
    configureWebpack: config => {
        if (isProduction) {
            // 用cdn方式引入
            config.externals = {
                'vue': 'Vue',
                // 'vuex': 'Vuex',
                // 'vue-router': 'VueRouter',
                // 'axios': 'axios'
            }
            // 为生产环境修改配置...
            // config.plugins.push(
            //     //生产环境自动删除console
            //     new UglifyJsPlugin({
            //         uglifyOptions: {
            //             compress: {
            //                 warnings: false,
            //                 drop_debugger: true,
            //                 drop_console: true,
            //             },
            //         },
            //         sourceMap: false,
            //         parallel: true,
            //     })
            // );
        } else {
            // 为开发环境修改配置...
        }
    },

}