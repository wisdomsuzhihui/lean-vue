require('./check-versions')(); // 检查 Node 和 npm 版本
var config = require('../config/');
var mongoose = require('mongoose');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn'),
  path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  proxyMiddleware = require('http-proxy-middleware'), // 配置代理中间件 https://github.com/chimurai/http-proxy-middleware
  webpackConfig = require('./webpack.dev.conf'),

  // default port where dev server listens for incoming traffic
  port = process.env.PORT || config.dev.port,
  // automatically open browser, if not set will be false
  autoOpenBrowser = !!config.dev.autoOpenBrowser,
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable = config.dev.proxyTable,

  app = express(),
  compiler = webpack(webpackConfig),

  devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  });

hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {

  }
});
/**
 * Vuex结合Mongoose最佳实践: https://segmentfault.com/a/1190000006125791
 */
mongoose.connect(config.dev.dbUrl.db
  .uri, config.dev.dbUrl.db.options)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    });
    cb()
  })
})

// compiler.apply(new DashboardPlugin());

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {
      target: options
    }
    app.use(proxyMiddleware(options.filter || context, options))
  }
})

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static')),

  uri = 'http://localhost:' + port;

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})
// 如果是开发环境
if (process.env === 'development') {
  app.set('showStackError', true); // 在屏幕上将错误信息打印出来
  app.use(logger(':method :url :status')); // 显示请求的类型、路径和状态
  app.locals.pretty = true; // 源码格式化，不要压缩
  mongoose.set('debug', true); // 显示数据库查询信息
}
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }


  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})