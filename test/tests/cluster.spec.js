/* global define */

define([
        'mocha',
        'chai',
        'sinon',
        '../../src/js/models/item.js',
        '../../src/js/collections/cluster.js',
        'fixtures/es/fixture',
        'helpers/fakeServer-helper'
], function(mocha, chai, sinon, MenuItem, Cluster) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

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

        describe("population from server", function() {
            

            beforeEach(function() {
                this.fixture = this.fixtures.Cluster.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://54.165.158.184/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
                this.cluster = new Cluster();
            });

            afterEach(function() {
                this.server.restore();
            });

            describe("fetch", function() {

                // No application code to implement — making sure the fake server is working
                it("should make the correct request", function() {
                    this.cluster.fetch();

                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal("GET");
                    expect(this.server.requests[0].url).to.equal("http://54.165.158.184/menus/item/_search");
                });

                // This is testing application code
                it("should parse items from the response", function() {
                    this.cluster.fetch({ reset: true });
                    this.server.respond();

                    expect(this.cluster).to.have.length(this.fixture.hits.hits.length); 
                });

                it("should return id of fetched items", function(done) {
                    this.cluster.fetch({ reset: true });
                    this.server.respond();

                    var item = this.cluster.at(0);
                    expect(item.get("_id")).to.equal(this.fixture.hits.hits[0]._id);
                    done();
                });
            });
        });
    });
});