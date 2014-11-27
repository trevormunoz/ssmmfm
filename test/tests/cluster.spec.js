/* global define */

define([
        'mocha',
        'chai',
        '../../src/js/models/item.js',
        '../../src/js/collections/cluster.js'
], function(mocha, chai, MenuItem, Cluster) {
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

            it("should default url property to es search url", function() {
                expect(this.cluster.url).to.equal('http://54.165.158.184/menus/item/_search');
            });

            it("can be instantiated from a collection of models", function() {

                var item1 = new MenuItem({dish_name: "Consomme printaniere royal", dish_id: 1});
                var item2 = new MenuItem({dish_name: "Radishes", dish_id: 7});
                var item3 = new MenuItem({dish_name: "Sliced Tomatoes", dish_id: 33});

                this.cluster.reset([item1, item2, item3]);

                expect(this.cluster).to.be.ok;
                expect(this.cluster).to.have.length(3);

            });
        });

        describe("modification", function() {
            it()
        });
    });
});