/* global define */

define([
        'mocha',
        'chai',
        '../../src/js/collections/cluster.js'
], function(mocha, chai, Cluster) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

    describe("Cluster", function() {

        describe("creation", function() {

            // Setup for the test suite
            before(function() {
                this.cluster = new Cluster();
            });

            after(function() {
                this.cluster = null;
            });

            // Test specifications
            it("can be instantiated with default values", function() {

                expect(this.cluster).to.be.ok;
                expect(this.cluster).to.have.length(0);
            });

            it("should default url property to 'http://some-url'", function() {
                expect(this.cluster.url).to.equal('http://some-url');
            });
        });
    });
});