/* global define */

define([
    '../../src/js/models/query'
], function(Query) {
    'use strict';

    describe("Model: Query", function() {

        describe("creation", function() {

            it("should exist", function() {
                var query = new Query();
                expect(query).to.be.ok;
            });
        });
    });

});