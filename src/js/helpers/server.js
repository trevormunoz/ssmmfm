/* global define */

define(['elasticsearch'], function(elasticsearch) {
    'use strict';

    var esClient = new elasticsearch.Client({
        host: 'https://api.publicfare.org'
        , apiVersion: "1.4"
        //, log: 'trace'
    });

    return esClient;
});