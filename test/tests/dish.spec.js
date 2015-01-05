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
        });
    });
});