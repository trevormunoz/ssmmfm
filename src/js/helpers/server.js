/* global define */

define(['elasticsearch'], function(elasticsearch) {
    'use strict';

    var esClient = new elasticsearch.Client({
        host: 'http://api.publicfare.org:80'
        , apiVersion: "1.4"
        //, log: 'trace'
    });

    return esClient;
});