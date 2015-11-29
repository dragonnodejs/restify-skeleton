'use strict';

// Cluster the application depends on the environment

require('throng')(
    () => { require('./app'); },
    {
        workers: process.env.WEB_CONCURRENCY,
        lifetime: Infinity
    }
);
