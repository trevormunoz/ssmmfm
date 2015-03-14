/* global define */

define([
        'sinon',
        'src/js/collections/dishes',
        'fixtures/es/fixture',
        'helpers/fakeServer-helper'
], function(sinon, Dishes) {
    'use strict';

    describe('Collection: Dishes', function () {
        
        describe('creation', function () {

            beforeEach(function () {
                this.collection = new Dishes();
            });

            afterEach(function () {
                this.collection.reset();
                this.collection = null;
            });
            
            it('should exist', function () {
                expect(this.collection).to.be.ok;
            });

            it('should be empty to start', function () {
                expect(this.collection).to.have.length(0);
            });

            it('should be associated with a model', function () {
                expect(this.collection.model).to.be.ok;
            }); 
        });
    });

            describe("population from server", function() {
            

            beforeEach(function() {
                this.fixture = this.fixtures.Dishes.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://api.publicfare.org/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
                this.dishes = new Dishes();
            });

            afterEach(function() {
                this.server.restore();
            });

            describe("fetch", function() {

                it("should parse dishes from the response", function() {
                    this.dishes.fetch({ reset: true });
                    this.server.respond();

                    expect(this.dishes).to.have.length(this.fixture.aggregations.dishes.buckets.length); 
                });

                it("should return attributes of fetched dish", function(done) {
                    this.dishes.fetch({ reset: true });
                    this.server.respond();

                    var item = this.dishes.at(0);
                    var fixtureItem = this.fixture.aggregations.dishes.buckets[0];
                    
                    expect(item.get("dish_id")).to.equal(fixtureItem.key);
                    done();
                });
            });
        });

});