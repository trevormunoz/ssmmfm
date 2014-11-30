/* global require */

require(['../src/js/config'], function() {

    require([
        'mocha',
        'chai',
        'tests/item.spec',
        'tests/cluster.spec',
        'tests/app-view.spec',
        'tests/cluster-view.spec',
        'tests/pickList-view.spec',
        'tests/item-view.spec',
        'tests/index-view.spec',
        'tests/message-view.spec'
    ], function(mocha, chai) {
        'use strict';

        mocha.run();

    });

});