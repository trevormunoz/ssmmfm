/* global define */

define([
        '../../src/js/models/dish',
], function(Dish) {
    'use strict';

    describe('Model: Dish', function () {
        
        describe('instantiation', function () {
            
            it("should exist", function() {
                var dish = new Dish();
                expect(dish).to.be.ok;
                dish = null;
            });

            it("should have the correct attributes", function() {
                var dish = new Dish();

                expect(dish.id).to.not.be.undefined;
                expect(dish.get("name_value")).to.not.be.undefined;
                expect(dish.get("menu_count")).to.not.be.undefined;
                expect(dish.get("exemplar_doc")).to.not.be.undefined;

                dish = null;
            });
        });
    });
});