'use strict';

const path = require('path');

module.exports = appInfo => {
  /**
   * 配置中心 options
   * @member Config#dsr
   * @property {Number} [heartbeatInterval] - 和 server 的心跳间隔
   * @property {Number} [responseTimeout] - 请求超时间隔
   * @property {Number} [retryInterval] - 失败重试间隔
   * @property {Number} [maxRetryInterval] - 最大失败重试间隔
   * @property {Number} [maxUpdateErrorCount] - 最大连续失败错误次数（如果连续失败次数超过该值，则降低重试频率到 maxRetryInterval）
   * @property {String} [snapshotDir] - 本地缓存路径
   * @property {Boolean} [ignoreStartError] - 忽略初始化异常，即使配置中心挂了，也不影响启动
   * @since 1.0.0
   */
  const config = {
    sofaDsr: {
      heartbeatInterval: 30000,
      responseTimeout: 10000,
      retryInterval: 5000,
      maxRetryInterval: 5 * 60000,
      maxUpdateErrorCount: 10,
      snapshotDir: path.join(appInfo.root, 'conf', 'dsr-node-client-cache'),
      ignoreStartError: false,
    },
    customLogger: {
      dsrLogger: {
        consoleLevel: 'NONE',
        file: path.join(appInfo.root, 'logs/dsr.log'),
      },
    },
    sofaRpc: {
      registerClass: require('../lib/index.js'),
    },
  };

  return config;
};
