/* global define */

define([
        'sinon',
        'src/js/views/cluster-view'
], function(sinon, ClusterView) {
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

            it('should have an events hash', function () {
                expect(this.view.events).to.be.ok;
            });

            it('should have the correct event listeners', function() {
                var eventsHash = this.view.events;
                expect(eventsHash['click .modal-footer button']).to.be.ok;
                expect(eventsHash['click .modal-footer button']).to.equal('closeInputModal');
                expect(this.view.closeInputModal).to.be.instanceOf(Function);
                expect(eventsHash['click tr.variant a']).to.be.ok;
                expect(eventsHash['click tr.variant a']).to.equal('showContextModal');
                expect(this.view.showContextModal).to.be.instanceOf(Function);
            });                        
        });

        describe('initialization', function () {

            beforeEach(function() {
                this.view = new ClusterView();
            });

            afterEach(function() {
                this.view.remove();
                this.view = null;
            });

            it('should have Mousetrap available', function() {
                expect(Mousetrap).to.be.ok;
            });

            describe('key bindings', function () {

                beforeEach(function () {
                    this.spy = sinon.spy(Mousetrap, 'bind');
                    this.view = new ClusterView();
                });

                afterEach(function () {
                    Mousetrap.bind.restore();
                    this.view.remove();
                    this.view = null;
                });
                
                it('should have Mousetrap bindings for keyboard events', function() {
                    expect(this.spy.callCount).to.equal(8);
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
                });         
            });            
            
        });

        describe('shuffle cluster', function () {
            
            before(function () {
                this.spy = sinon.spy(ClusterView.prototype, 'resetCluster');
                this.view = new ClusterView();
            });

            after(function () {
                ClusterView.prototype.resetCluster.restore();
                this.view.remove();
                this.view = null;
            });

            it('should shuffle cluster on Mousetrap space event', function () {
                expect(this.spy).to.not.have.been.called;
                Mousetrap.trigger('space');
                expect(this.spy.calledOnce).to.be.true;
                Mousetrap.trigger('space');
                Mousetrap.trigger('space');
                expect(this.spy.calledThrice).to.be.true;
            });
            
        });
    });
});