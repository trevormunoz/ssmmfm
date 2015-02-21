/* global define */

define([
        'sinon',
        '../../src/js/views/app-view',
        'fixtures/es/fixture',
        'helpers/fakeServer-helper'
], function(sinon, AppView) {
    'use strict';

    describe("View: App", function() {
        describe("creation", function(){

            beforeEach(function() {
                this.fixture = this.fixtures.AppView.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://54.165.158.184/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
                this.server.autoRespond = true;
                this.app = new AppView();
            });

            afterEach(function() {
                this.server.restore();
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

            it("should respond to loadDefault event", function() {
                this.fixture = this.fixtures.AppView.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://54.165.158.184/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
                this.server.autoRespond = true;

                var bootstrapSpy = sinon.spy(
                    AppView.prototype, 'bootstrapCluster'
                    );
                var view = new AppView();
                Backbone.trigger('loadDefault');

                expect(bootstrapSpy.callCount).to.equal(1);

                this.server.restore();
                AppView.prototype.bootstrapCluster.restore();
            });

        });

        // This test only indicates that there should be a call to a 
        // 'bootstrapCluster' method on initialization of AppView; 
        describe("bootstrapping", function() {

            before(function() {
                this.fixture = this.fixtures.AppView.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://54.165.158.184/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
                this.server.autoRespond = true;

                this.spy = sinon.spy($, 'ajax');
                this.view = new AppView();
                Backbone.trigger('loadDefault');
            });

            after(function() {
                this.server.restore();
                this.view.remove();
                $.ajax.restore();
            });

            it("should send the correct query", function() {
                
                // spy.args[0] is array of arguments received in 1st call
                var queryString = this.spy.args[0][0].data;

                // Use regex to crudely test that expected components of
                // query are present
                var fingerprintRegex = /dish_name_fingerprint/g;
                var scoreRegex = /random_score/g;
                
                expect(fingerprintRegex.test(queryString)).to.be.true;
                expect(scoreRegex.test(queryString)).to.be.true;
            });

        });
    });
});