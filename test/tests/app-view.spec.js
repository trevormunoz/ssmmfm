/* global define */

define([
        'mocha', 
        'chai',
        '../../src/js/views/app-view'
], function(mocha, chai, AppView) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

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
                expect(this.app).to.exist;
            });

            it("should bind to the correct element", function() {
                expect(this.app.$el.selector).to.equal('#app-content');
            });

            it("should initialize the cluster subview", function() {
                expect(this.app.subviews.cluster).to.be.ok;
            });
        });
    });
});