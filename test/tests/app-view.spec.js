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