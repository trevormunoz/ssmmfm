/* global require */

require(['../src/js/config'], function() {

    require([
        'mocha',
        'chai',
    ], function(mocha, chai) {
        'use strict';

        var expect = chai.expect;
        mocha.setup("bdd");

        mocha.run();

    });

});