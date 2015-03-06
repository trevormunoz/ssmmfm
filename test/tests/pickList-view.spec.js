/* global define */

define([
        'sinon',
        'src/js/collections/cluster',
        'src/js/views/pickList-view',
        'fixtures/es/fixture',
        'helpers/fakeServer-helper'
], function(sinon, Cluster, PickListView) {
    'use strict';

    describe("View: PickList", function() {
        describe("creation", function() {

            beforeEach(function() {
                this.fixture = this.fixtures.Cluster.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://52.0.128.38/menus/item/_search",
                        this.validResponse(this.fixture)
                    );

                var cluster = new Cluster();
                this.view = new PickListView({collection: cluster});
            });

            afterEach(function() {
                this.server.restore;
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
                this.fixture = this.fixtures.Cluster.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://52.0.128.38/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
            });

            after(function () {
                this.server.restore();
            });
            
            it('should respond to a facetQuerySuccess event', function () {
                
                var buildSpy = sinon.spy(PickListView.prototype, 
                    'buildCluster');
                var cluster = new Cluster();
                var view = new PickListView({collection: cluster});

                expect(buildSpy).to.not.have.been.called;
                Backbone.trigger('facetQuerySuccess');
                expect(buildSpy.calledOnce).to.be.true;

                PickListView.prototype.buildCluster.restore();
                view.remove();
                view = null;
            });

            it('should respond to a collection reset event', function (done) {
                var renderSpy = sinon.spy(PickListView.prototype, 
                    'render');
                var cluster = new Cluster();
                var view = new PickListView({collection: cluster});
                
                expect(renderSpy).to.not.have.been.called;
                cluster.fetch({reset: true});
                this.server.respond();
                expect(renderSpy.calledOnce).to.be.true;
                done();

                PickListView.prototype.render.restore();
            });
        });

        describe('render', function () {

            before(function () {
                this.fixture = this.fixtures.Cluster.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://52.0.128.38/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
            });

            after(function () {
                this.server.restore();
            });
            
            it('should call addRow for each model returned', function (done) {
                var addSpy = sinon.spy(PickListView.prototype, 
                    'addRow');
                var cluster = new Cluster();
                var view = new PickListView({collection: cluster});
                
                expect(addSpy).to.not.have.been.called;
                cluster.fetch({reset: true});
                this.server.respond();
                expect(addSpy.callCount).to.be.equal(this.fixture.aggregations.dish.buckets.length);
                done();

                PickListView.prototype.addRow.restore();
            });
            
        });
    });
});