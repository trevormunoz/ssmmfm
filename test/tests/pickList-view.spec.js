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

        describe("initialization", function() {

            beforeEach(function() {
                this.spy = sinon.spy(PickListView.prototype, 'listenTo');
                this.context = {
                    listenTo: sinon.stub().returns(context),
                    clusterBootstrapped: ['id1', 'id2', 'id3']
                }
                var cluster = new Cluster();
                this.view = new PickListView({collection: cluster});
            });

            afterEach(function() {
                PickListView.prototype.listenTo.restore();
                this.view.remove();
                this.view = null;
            });

            it("should setup an event listener", function() {
                expect(this.spy.callCount).to.equal(1);

                var listenerArgs = this.spy.args[0];
                expect(listenerArgs[1]).to.equal('clusterBootstrapped');
            });
        });

        describe("load cluster function", function() {

            it("should respond to clusterBootstrapped event", function() {
                var loadSpy = sinon.spy(PickListView.prototype, 'loadCluster');
                var context = {
                    loadCluster: sinon.stub().returns(context),
                    clusterBootstrapped: 'something'
                }

                var cluster = new Cluster();
                var view = new PickListView({collection: cluster});

                expect(loadSpy).to.not.have.been.called;
                Backbone.trigger('clusterBootstrapped');
                expect(loadSpy.callCount).to.equal(1);
                
                PickListView.prototype.loadCluster.restore();
            });
        });
    });
});