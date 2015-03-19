/* global define */

define([
        'sinon',
        'src/js/collections/dishes',
        'fixtures/es/fixture'
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

        describe("population from server", function() {
        

        beforeEach(function() {
            this.fixture = this.fixtures.Dishes.valid;
            this.dishes = new Dishes();
            var data = this.dishes.parse(this.fixture);
            this.dishes.reset(data);
        });

        afterEach(function() {
            this.dishes.reset();
            this.dishes = null;
        });

        // TODO test for fetch

        describe("fetch", function() {

            it("should parse dishes from the response", function() {

                expect(this.dishes).to.have.length(this.fixture.aggregations.dishes.buckets.length); 
            });

            it("should return attributes of fetched dish", function() {

                var item = this.dishes.at(0);
                var fixtureItem = this.fixture.aggregations.dishes.buckets[0];
                
                expect(item.get("dish_id")).to.equal(fixtureItem.key);
            });
        });
    });

    });

});