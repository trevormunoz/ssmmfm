/* global define */

define([
        'src/js/collections/cluster',
        'src/js/views/pickList-view'
], function(Cluster, PickListView) {
    'use strict';

    describe("View: PickList", function() {
        describe("creation", function() {

            beforeEach(function() {
                var cluster = new Cluster();
                this.view = new PickListView({collection: cluster});
            });

            afterEach(function() {
                this.view.remove();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            it("should target the correct selector for binding", function() {
                expect(this.view.$el.selector).to.equal('#picker');
            });

            it("should be backed by a collection", function(){
                expect(this.view.collection).to.be.ok;
            });
        });
    });
});