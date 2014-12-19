/* global define */

define([
        'sinon',
        '../../src/js/views/app-view'
], function(sinon, AppView) {
    'use strict';

    describe("View: App", function() {
        describe("creation", function(){

            beforeEach(function() {
                this.app = new AppView();
            });

            afterEach(function() {
                this.app.remove();
                this.app = null;
            });

            it("should exist", function() {
                expect(this.app).to.be.ok;
            });

            it("should bind to the correct element", function() {
                expect(this.app.$el.selector).to.equal('#app-content');
            });

            // Using convention of creating object called 'subviews' on
            // this main "app" view to hold references to subviews, 
            // each of which get created during this view's initialization.
            it("should initialize a subviews object", function() {
                expect(this.app.subviews).to.exist;
                expect(this.app.subviews).to.be.instanceOf(Object);
            });

            it("should initialize a subview for a cluster", function() {
                expect(this.app.subviews.cluster).to.be.ok;
            });

            it("should initialize a subview for messages", function() {
                expect(this.app.subviews.messages).to.be.ok;                
            });
        });

        describe("initialization", function() {
            before(function() {
                this.spy = sinon.spy(AppView.prototype, 'listenTo');
                this.context = {
                    listenTo: sinon.stub().returns(context),
                    seedQuerySuccess: 'This is a seed'
                }
                this.view = new AppView();
            });

            after(function() {
                AppView.prototype.listenTo.restore();
            });

            it("should setup an event listener", function() {
                expect(this.spy.callCount).to.equal(1);
                
                // sinon.spy.args returns an array of args; 
                // arg to the listenTo function is itself 
                // an array of 3 arguments
                var listenerArgs = this.spy.args[0];
                expect(listenerArgs[1]).to.equal('seedQuerySuccess');
            });
        });

        // This test only indicates that there should be a call to a 
        // 'bootstrapCluster' method on initialization of AppView; 
        describe("bootstrapping", function() {

            it("should call the bootstrapCluster method on init", function() {
                var bootstrapSpy = sinon.spy(
                    AppView.prototype, 'bootstrapCluster'
                    );
                var view = new AppView();

                expect(bootstrapSpy.callCount).to.equal(1);

                AppView.prototype.bootstrapCluster.restore();
            });

            it("should respond to seedQuerySuccess event", function() {
                var seedSpy = sinon.spy(AppView.prototype, 'calculateCluster');
                var view = new AppView();

                expect(seedSpy).to.not.have.been.called;
                Backbone.trigger('seedQuerySuccess');
                expect(seedSpy.callCount).to.equal(1);

                AppView.prototype.calculateCluster.restore();
            });

            // The bootstrapCluster method should fire an ajax call
            describe("ajax", function() {
                before(function() {
                    this.jquerySpy = sinon.spy($, 'ajax');
                    var view = new AppView();
                });

                after(function() {
                    $.ajax.restore();
                });

                it("jQuery ajax should be called once", function() {
                    expect(this.jquerySpy.callCount).to.equal(1);
                });

                it("should make the correct request", function() {
                    var request = this.jquerySpy.getCall(0).args[0];
                    expect(request.url).to.equal('http://54.165.158.184/menus/item/_search');
                    expect(request.type).to.equal('GET');
                    expect(request.data).to.be.ok;
                });
            });
        });
    });
});