/* global define */

define([
        'sinon',
        'src/js/collections/index',
        'src/js/views/index-view'
], function(sinon, Index, IndexView) {
    'use strict';

    describe("View: Index Output", function() {
        describe("creation", function() {

            beforeEach(function() {
                var index = new Index();
                this.view = new IndexView({collection: index});
            });

            afterEach(function() {
                this.view.collection.reset();
                this.view.remove();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            it("should bind to the correct DOM element", function() {
                expect(this.view.$el.selector).to.equal('#index');
            });

            it('should reflect a collection', function () {
                expect(this.view.collection).to.be.ok;
            });
        });
    });
});