/* global require */

require(['../src/js/config'], function() {

    require([
        'mocha',
        'tests/app-router.spec',
        'tests/app-view.spec',
        'tests/cluster-view.spec',
        'tests/cluster.spec',
        'tests/dish.spec',
        'tests/dishes.spec',
        'tests/fingerprint.spec',
        'tests/index-view.spec',
        'tests/index.spec',
        'tests/item.spec',
        'tests/listRow-view.spec',
        'tests/message-view.spec',
        'tests/pickList-view.spec',
        'tests/seeds.spec',
        'tests/term.spec'
    ], function(mocha) {
        'use strict';

        (window.mochaPhantomJS || mocha).run();

    });

});