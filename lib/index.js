'use strict';

module.exports = app => {

  if (app.config.sofaDsr && app.config.sofaDsr.enable === false) {
    return;
  }
  app.sofaDsr
    .on('all', data => {
      const key = `${data.dataId}@${data.groupId}`;
      app.sofaDsr.logger.info('[egg:sofa-node-dsr:%s] configserver: [%s], revision: [%s], service[%s]可调用的目标地址列表为:%j',
        app.type, data.hostname, data.revision, key, data.value);
    })
    .on('error', err => {
      if (!err.__hasLog) {
        app.sofaDsr.logger.error(err);
        err.__hasLog = true;
      }
    })
    // connection events
    .on('connection', meta => {
      app.sofaDsr.logger.info('[egg:dsr:%s] connection start: %j', app.type, meta);
    })
    .on('config_servers_update', servers => {
      servers = servers || [];
      servers = servers.map(item => {
        return item.port ? `${item.hostname}:${item.port}` : item.hostname;
      });
      app.sofaDsr.logger.info('[egg:sofaDsr:%s] confreg update %d servers: %j', app.type, servers.length, servers);
    });
};
