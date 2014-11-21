/* global require */

require(['../src/js/config'], function() {

    require([
        'mocha',
        'chai',
        'tests/item.spec'
    ], function(mocha, chai) {
        'use strict';

        mocha.run();

    });

});