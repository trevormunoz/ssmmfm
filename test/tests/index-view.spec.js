/* global define */

define([
        'src/js/views/index-view'
], function(IndexView) {
    'use strict';

    describe("View: Index Output", function() {
        describe("creation", function() {

            beforeEach(function() {
                this.view = new IndexView();
            });

            afterEach(function() {
                this.view.remove();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            it("should be created with correct DOM element", function() {
                expect(this.view.$el[0].nodeName).to.equal('DIV');
                expect(this.view.$el[0].className).to.equal('index-output');
            });
        });
    });
});