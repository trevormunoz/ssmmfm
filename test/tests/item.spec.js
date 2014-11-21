/* global define */

define([
        'mocha',
        'chai',
        '../../src/js/models/item.js'
], function(mocha, chai, MenuItem) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

    describe("Item Model", function() {

        describe("creation", function() {
            it('can be instantiated', function() {

                var item = new MenuItem();
                expect(item).to.be.ok;
            });
        });
    });

});