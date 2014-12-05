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
            before(function() {
                this.spy = sinon.spy(PickListView.prototype, 'listenTo');
                this.context = {
                    listenTo: sinon.stub().returns(context),
                    seedQuerySuccess: 'This is a seed'
                }
                this.view = new PickListView();
            });

            it("should setup an event listener", function() {
                expect(this.spy.callCount).to.equal(1);
                
                //sinon.spy.args returns an array; and an array of 3 arguments is passed to the listenTo function
                var listenerArgs = this.spy.args[0];
                expect(listenerArgs[1]).to.equal('seedQuerySuccess');
            });

            after(function() {
                PickListView.prototype.listenTo.restore();
            });
        });

        describe("load seed cluster", function() {
            it("should respond to seedQuerySuccess event", function() {
                var seedSpy = sinon.spy(PickListView.prototype, 'loadSeedCluster');
                var view = new PickListView();

                expect(seedSpy).to.not.have.been.called;
                Backbone.trigger('seedQuerySuccess');
                expect(seedSpy.callCount).to.equal(1);

                PickListView.prototype.loadSeedCluster.restore();
            });
        });
    });
});