/* global define */

define(['elasticsearch'], function(elasticsearch) {
    'use strict';

    var esClient = new elasticsearch.Client({
        host: 'http://api.publicfare.org:80'
        //, log: 'trace'
    });

    return esClient;
});