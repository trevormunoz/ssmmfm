/* global define */

define([
        'sinon',
        '../../src/js/views/app-view',
        'fixtures/es/fixture'
], function(sinon, AppView) {
    'use strict';

    describe("View: App", function() {
        describe("creation", function(){

            beforeEach(function() {
                this.stub = sinon.stub(AppView.prototype, 'checkServer');
                this.app = new AppView();
            });

            afterEach(function() {
                AppView.prototype.checkServer.restore();
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

            it("should check that the server is up", function() {
                expect(this.stub.callCount).to.equal(1);
            });
        });

        describe("events", function() {

            it("should respond to loadDefault event", function() {

                var serverStub = sinon.stub(AppView.prototype, 'checkServer');
                var bootstrapStub = sinon.stub(
                    AppView.prototype, 'bootstrapCluster'
                    );
                var view = new AppView();
                Backbone.trigger('loadDefault');

                expect(bootstrapStub.callCount).to.equal(1);

                AppView.prototype.checkServer.restore();
                AppView.prototype.bootstrapCluster.restore();
            });

        });

        //TODO: Test server ping and seed query functions directly

    });
});