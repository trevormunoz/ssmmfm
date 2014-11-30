/* global define */

define([
        'src/js/models/item',
        'src/js/views/item-view'
], function(MenuItem, ItemView) {
    'use strict';

    describe("View: Item", function() {
        describe("creation", function() {
            
            beforeEach(function() {
                var item = new MenuItem();
                this.view = new ItemView({model: item});
            });

            afterEach(function() {
                this.view.remove();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            // This element won't initially exist in HTML; will be 
            // managed by the cluster view
            it("should be created with correct DOM element", function() {
                expect(this.view.$el[0].nodeName).to.equal('DIV');
                expect(this.view.$el[0].className).to.equal('viewer');
            });

            it("should be backed by a model", function() {
                expect(this.view.model).to.be.ok;
            });
        });
    });
});