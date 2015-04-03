/* global define */

define([
        'sinon',
        'src/js/collections/seeds',
        'src/js/views/cluster-view'
], function(sinon, Seeds, ClusterView) {
    'use strict';

    describe("View: Cluster", function(){
        describe("creation", function() {

            beforeEach(function() {
                var seedsStub = sinon.createStubInstance(Seeds);
                this.view = new ClusterView({collection: seedsStub});
            });

            afterEach(function() {
                this.view.cleanUp();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            it("should target the correct selector for binding", function() {
                expect(this.view.$el.selector).to.equal('#cluster');
            });

            it("should be backed by a collection", function(){
                expect(this.view.collection).to.be.ok;
            });

            it("should initialize a subviews object", function(){
                expect(this.view.subviews).to.be.ok;
                expect(this.view.subviews).to.be.instanceOf(Object);
            });

            it('should have an events hash', function () {
                expect(this.view.events).to.be.ok;
            });

            it('should have the correct event hash listeners', function() {
                var eventsHash = this.view.events;
                expect(eventsHash['click .modal-footer button']).to.be.ok;
                expect(eventsHash['click .modal-footer button']).to.equal('closeInputModal');
                expect(this.view.closeInputModal).to.be.instanceOf(Function);
                expect(eventsHash['click tr.variant a']).to.be.ok;
                expect(eventsHash['click tr.variant a']).to.equal('showContextModal');
                expect(this.view.showContextModal).to.be.instanceOf(Function);
            }); 

            it('should have Mousetrap available', function() {
                expect(Mousetrap).to.be.ok;
            });
                       
        });

        describe('initialization', function () {

            beforeEach(function() {
                var seedsStub = sinon.createStubInstance(Seeds);
                this.view = new ClusterView({collection: seedsStub});
            });

            afterEach(function() {
                this.view.cleanUp();
                this.view = null;
            });

            describe('subviews', function () {

                it("should initialize a subview for the pick list", function() {
                    expect(this.view.subviews.picker).to.be.ok;
                });

                it("should initialize a subview for the index output", function() {
                    expect(this.view.subviews.index).to.be.ok;
                });
                
            });

            describe('key bindings', function () {

                beforeEach(function () {
                    this.spy = sinon.spy(Mousetrap, 'bind');
                    var seedsCollex = new Seeds();
                    this.view = new ClusterView({collection: seedsCollex});
                });

                afterEach(function () {
                    Mousetrap.bind.restore();
                    this.view.remove();
                    this.view = null;
                });
                
                it('should have Mousetrap bindings for keyboard events', function() {
                    expect(this.spy.callCount).to.equal(11);
                });

                it('should bind the correct keys', function() {
                    expect(this.spy.withArgs('space').calledOnce).to.be.true;
                    expect(this.spy.withArgs('p').calledOnce).to.be.true;
                    expect(this.spy.withArgs('down').calledOnce).to.be.true;
                    expect(this.spy.withArgs('up').calledOnce).to.be.true;
                    expect(this.spy.withArgs('l').calledOnce).to.be.true;
                    expect(this.spy.withArgs('s').calledOnce).to.be.true;
                    expect(this.spy.withArgs('w').calledOnce).to.be.true;
                    expect(this.spy.withArgs('j').calledOnce).to.be.true;
                    expect(this.spy.withArgs('option+s').calledOnce).to.be.true;
                    expect(this.spy.withArgs('h').calledOnce).to.be.true;
                    expect(this.spy.withArgs('r').calledOnce).to.be.true;
                });         
            });
            
        });

        describe('events', function () {

            beforeEach(function () {
                this.dedupeFingerprintStub = sinon.stub(ClusterView.prototype, 'dedupeFingerprint');
                this.getFacetsStub = sinon.stub(ClusterView.prototype, 'getFacets');
                var seedsStub = sinon.createStubInstance(Seeds);
                this.view = new ClusterView({collection: seedsStub});
            });

            afterEach(function () {
                ClusterView.prototype.dedupeFingerprint.restore();
                ClusterView.prototype.getFacets.restore();
                this.view.cleanUp();
            });
           
            it("should respond to a seedQuerySuccess event", function() {
                
                Backbone.trigger('seedQuerySuccess', 'cup tea');
                expect(this.dedupeFingerprintStub.callCount).to.equal(1);
                
                var stubArgs = this.dedupeFingerprintStub.args[0];
                expect(stubArgs[0]).to.equal('cup tea');

            });

            it('should respond to a fingerprintSuccess event', function () {
                
                Backbone.trigger('fingerprintSuccess', 'cup tea');
                expect(this.getFacetsStub.callCount).to.equal(1);
                
                var stubArgs = this.getFacetsStub.args[0];
                expect(stubArgs[0]).to.equal('cup tea');
            });

        });

        describe('shuffle cluster', function () {
            
            before(function () {
                this.resetClusterStub = sinon.stub(ClusterView.prototype, 'resetCluster');
                var seedsStub = sinon.createStubInstance(Seeds);
                this.view = new ClusterView({collection: seedsStub});
            });

            after(function () {
                ClusterView.prototype.resetCluster.restore();
                this.view.cleanUp();
                this.view = null;
            });

            it('should shuffle cluster on Mousetrap space event', function () {
                expect(this.resetClusterStub).to.not.have.been.called;
                Mousetrap.trigger('space');
                expect(this.resetClusterStub.calledOnce).to.be.true;
                Mousetrap.trigger('space');
                Mousetrap.trigger('space');
                expect(this.resetClusterStub.calledThrice).to.be.true;
            });
            
        });

        describe('dedupe fingerprints', function () {
            
            before(function () {

                this.getFacetsStub = sinon.stub(ClusterView.prototype, 'getFacets');
                var seedsCollex = new Seeds();
                this.view = new ClusterView({collection: seedsCollex});
            });

            it('should deduplicate fingerprint values', function () {
                
                expect(this.getFacetsStub).to.not.have.been.called;

                this.view.dedupeFingerprint('coffee');
                this.view.dedupeFingerprint('green peppers stuffed');
                // Duplicate
                this.view.dedupeFingerprint('coffee');

                expect(this.getFacetsStub.callCount).to.equal(2);
                expect(this.view.collection.length).to.equal(2);

            });

            after(function () {
                ClusterView.prototype.getFacets.restore();
                this.view.collection.reset();
                this.view.collection = null;
                this.view.cleanUp();
                this.view = null;
            });
        });
    });
});