'use strict';

module.exports = {
  /**
   * Dsr 实例
   * @member Context#dsr
   * @since 1.0.0
   */
  get dsr() {
    /* istanbul ignore next */
    return this.app.dsr;
  },
  /**
   * ConfigClient 实例
   * @member Context#configclient
   * @since 1.0.0
   */
  get configclient() {
    /* istanbul ignore next */
    return this.app.dsr;
  },
};
