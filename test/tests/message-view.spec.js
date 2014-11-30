/*global define*/

define([
        'mocha',
        'chai',
        'src/js/views/message-view'
], function(mocha, chai, MessageView) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

    describe("View: Messages", function() {
        describe("creation", function() {

            beforeEach(function() {
                this.view = new MessageView();
            });

            afterEach(function() {
                this.view.remove();
                this.view = null;
            });

            it("should exist", function() {
                expect(this.view).to.be.ok;
            });

            it("should target the correct selector for binding", function() {
                expect(this.view.$el.selector).to.equal('#messages');
            });
        });
    });
});