/* global define */

define([
        'src/js/views/cluster-view'
], function(ClusterView) {
    'use strict';

    describe("View: Cluster", function(){
        describe("creation", function() {

            beforeEach(function() {
                this.view = new ClusterView();
            });

            afterEach(function() {
                this.view.remove();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            it("should target the correct selector for binding", function() {
                expect(this.view.$el.selector).to.equal('#cluster');
            });

            it("should initialize a subviews object", function(){
                expect(this.view.subviews).to.be.ok;
                expect(this.view.subviews).to.be.instanceOf(Object);
            });

            it("should initialize a subview for the pick list", function() {
                expect(this.view.subviews.picker).to.be.ok;
            });

            it("should initialize a subview for the item viewer", function() {
                expect(this.view.subviews.viewer).to.be.ok;
            });

            it("should initialize a subview for the index output", function() {
                expect(this.view.subviews.index).to.be.ok;
            });                        
        });
    });
});