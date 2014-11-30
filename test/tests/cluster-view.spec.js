/* global define */

define([
        'mocha',
        'chai',
        'src/js/views/cluster-view'
], function(mocha, chai, ClusterView) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

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

            it("should initialize 3 subviews", function(){
                expect(this.view.subviews).to.be.ok;
                expect(this.view.subviews).to.be.instanceOf(Object);
                
                expect(this.view.subviews.picker).to.be.ok;
                expect(this.view.subviews.viewer).to.be.ok;
                expect(this.view.subviews.index).to.be.ok;
            });
        });
    });
});