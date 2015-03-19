/* global define */

define([
        'sinon',
        '../../src/js/models/item.js',
        '../../src/js/collections/cluster.js',
        'fixtures/es/fixture',
], function(sinon, MenuItem, Cluster) {
    'use strict';

    describe("Collection: Cluster", function() {

        describe("creation", function() {

            // Setup for the test suite
            before(function() {
                this.cluster = new Cluster();
            });

            after(function() {
                this.cluster.reset();
                this.cluster = null;
            });

            // Test specifications
            it("can be instantiated with default values", function() {

                expect(this.cluster).to.be.ok;
                expect(this.cluster).to.have.length(0);
            });

            it("should be associated with a model", function() {
                expect(this.cluster.model).to.be.ok;
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

        describe("fetch and parse", function() {

            beforeEach(function() {
                this.fixture = this.fixtures.Cluster.valid;
                this.cluster = new Cluster();
                var data = this.cluster.parse(this.fixture);
                this.cluster.reset(data);
            });

            afterEach(function() {
                this.cluster.reset();
                this.cluster = null;
            });

            // TODO test for fetch

            it('should parse responses from the server', function () {
                expect(this.cluster).to.have.length(this.fixture.aggregations.dish.buckets.length);
            });

            it('should return attributes of dish', function () {

                var item = this.cluster.at(0);
                var fixtureItem = this.fixture.aggregations.dish.buckets[0];
                
                expect(item.get("id")).to.equal(fixtureItem.key);
                expect(item.get("menu_count")).to.equal(fixtureItem.top_names.hits.hits[0]._source.dish_menus_appeared);
                expect(item.get("name_value")).to.equal(fixtureItem.top_names.hits.hits[0]._source.dish_name);
                expect(item.get("exemplar_doc")).to.equal(fixtureItem.top_names.hits.hits[0]._id);
                
            });

        });
    });
});