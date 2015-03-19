/* global define */

define([
        'sinon',
        'src/js/collections/cluster',
        'src/js/views/pickList-view',
        'src/js/helpers/queries',
        'fixtures/es/fixture'
], function(sinon, Cluster, PickListView, Queries) {
    'use strict';

    describe("View: PickList", function() {
        describe("creation", function() {

            beforeEach(function() {
                var cluster = new Cluster();
                this.view = new PickListView({collection: cluster});
            });

            afterEach(function() {
                // this.server.restore;
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
            
            // it('should respond to a facetQuerySuccess event', function () {
                
            //     var buildStub = sinon.stub(PickListView.prototype, 
            //         'buildCluster');
            //     var cluster = new Cluster();
            //     var view = new PickListView({collection: cluster});

            //     expect(buildStub).to.not.have.been.called;
            //     Backbone.trigger('facetQueryReady');
            //     expect(buildStub.calledOnce).to.be.true;

            //     PickListView.prototype.buildCluster.restore();
            //     view.remove();
            //     view = null;
            // });

            // it('should respond to a collection reset event', function () {
            //     var fetchStub = sinon.stub(Cluster.prototype, 'fetch');
            //     var fixture = this.fixture = this.fixtures.pickListView.valid;
            //     var renderSpy = sinon.spy(PickListView.prototype, 
            //         'render');
            //     var cluster = new Cluster();
            //     var view = new PickListView({collection: cluster});
                
            //     expect(renderSpy).to.not.have.been.called;
            //     var query = Queries.getAggByFingerprint('cup tea'); 
            //     //var newData = cluster.parse(fetchStub.returns(fixture));
            //     //cluster.reset(newData);
            //     expect(renderSpy.calledOnce).to.be.true;

            //     Cluster.prototype.fetch.restore();
            //     PickListView.prototype.render.restore();
            // });
        });

        // describe('render', function () {
            
        //     it('should call addRow for each model returned', function (done) {
        //         var addSpy = sinon.spy(PickListView.prototype, 
        //             'addRow');
        //         var cluster = new Cluster();
        //         var view = new PickListView({collection: cluster});
                
        //         expect(addSpy).to.not.have.been.called;
        //         cluster.fetch({reset: true});
        //         this.server.respond();
        //         expect(addSpy.callCount).to.be.equal(this.fixture.aggregations.dish.buckets.length);
        //         done();

        //         PickListView.prototype.addRow.restore();
        //     });
            
        // });
    });
});