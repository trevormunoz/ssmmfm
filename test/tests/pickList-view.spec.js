/* global define */

define([
        'sinon',
        'src/js/collections/cluster',
        'src/js/views/pickList-view'
], function(sinon, Cluster, PickListView) {
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

        describe('initialization', function () {

            before(function () {
                this.spy = sinon.spy(PickListView.prototype, 
                    'buildCluster');
                var cluster = new Cluster();
                this.view = new PickListView({collection: cluster});
            });

            after(function () {
                PickListView.prototype.buildCluster.restore();
                this.view.remove();
                this.view = null;
            });
            
            it('should respond to a facetQuerySuccess event', function () {
                
                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('facetQuerySuccess');
                expect(this.spy.calledOnce).to.be.true;
            });
        });
    });
});