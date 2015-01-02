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
            
            it("should setup an event listener", function() {
                this.fixture = this.fixtures.AppView.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://54.165.158.184/menus/item/_search",
                        this.validResponse(this.fixture)
                    );
                this.server.autoRespond = true;
                
                var listenerSpy = sinon.spy(AppView.prototype, 'listenTo');
                var view = new AppView();
                
                expect(listenerSpy.callCount).to.equal(1);
                
                // sinon.spy.args returns an array of args; 
                // arg to the listenTo function is itself 
                // an array of 3 arguments
                var listenerArgs = listenerSpy.args[0];
                expect(listenerArgs[1]).to.equal('seedQuerySuccess');

                this.server.restore();
                AppView.prototype.listenTo.restore();
            });

            it("should call the bootstrapCluster method on init", function() {
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
            });

            after(function() {
                this.server.restore();
            });

            it("should make a jQuery ajax request", function() {
                var ajaxSpy = sinon.spy($, 'ajax');
                var view = new AppView();

                expect(this.server.requests.length).to.equal(1);
                expect(ajaxSpy.calledOnce).to.be.true;

                $.ajax.restore();
            });

            it("should pass the correct query as argument", function() {
                var ajaxSpy = sinon.spy($, 'ajax');
                var view = new AppView();
                
                // spy.args[0] is array of arguments received in 1st call
                var queryString = ajaxSpy.args[0][0].data;

                // Use regex to crudely test that expected components of
                // query are present
                var fingerprintRegex = /dish_name_fingerprint/g;
                var scoreRegex = /random_score/g;
                
                expect(fingerprintRegex.test(queryString)).to.be.true;
                expect(scoreRegex.test(queryString)).to.be.true;

                $.ajax.restore();
            });

        });
    });
});