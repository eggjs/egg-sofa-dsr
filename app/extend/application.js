'use strict';

const assert = require('assert');
const ConfigClient = require('antfin-sofa-node-dsr');

// Symbols
const _sofaRegistry = Symbol.for('egg#sofaRegistry');
module.exports = {
  get sofaRegistry() {
    if (!this[_sofaRegistry]) {
      assert(this.config.instanceId, 'instanceId is required');

      const logger = this.getLogger('dsrLogger');
      const options = Object.assign({
        appName: this.config.name,
        httpclient: this.httpclient,
        cluster: this.cluster,
        // 共享版 DSR 需要传入 instanceId 和 antvip
        instanceId: this.config.instanceId,
        antvip: this.sofaAntvip,
        logger,
        app: this,
      }, this.config.sofaDsr);

      const ignoreStartError = options.ignoreStartError;
      this[_sofaRegistry] = new ConfigClient(options);

      const logConnectionCloseEvent = meta => {
        options.logger.warn('[egg:dsr:%s] connection close: %j', this.type, meta);
      };

      this[_sofaRegistry].on('connection_close', logConnectionCloseEvent);

      this[_sofaRegistry].on('error', err => { logger.error(err); });

      this.beforeClose(async () => {
        this[_sofaRegistry].removeListener('connection_close', logConnectionCloseEvent);
        await this[_sofaRegistry].close();
      });

      if (!ignoreStartError) {
        this.beforeStart(async () => {
          await this[_sofaRegistry].ready();
          logger.info('[egg:dsr:%s] sofa dsr init success', this.type);
        });
      }
    }
    return this[_sofaRegistry];
  },
  get sofaDsr() {
    return this.sofaRegistry;
  },
  get dsr() {
    return this.sofaRegistry;
  },
};
