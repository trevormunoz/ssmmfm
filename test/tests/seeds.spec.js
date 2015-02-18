/* global define */

define([
        'src/js/collections/seeds'
], function(Seeds) {
    'use strict';

    describe('Collection: Seeds', function () {
        
        describe('creation', function () {

            beforeEach(function () {
                this.collection = new Seeds();
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

});