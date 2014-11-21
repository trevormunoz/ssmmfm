/* global require */

require(['../src/js/config'], function() {

    require([
        'mocha',
        'chai',
        'tests/item.spec',
        'tests/cluster.spec'
    ], function(mocha, chai) {
        'use strict';

        mocha.run();

    });

});