'use strict';

const path = require('path');

module.exports = appInfo => {
  return {
    sofaDsr: {
      snapshotDir: path.join(appInfo.root, 'run/conf/dsr-node-client-cache'),
    },
  };
};
