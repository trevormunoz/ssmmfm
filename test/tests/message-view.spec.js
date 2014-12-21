/*global define*/

define([
        'backbone',
        'sinon',
        'src/js/views/message-view'
], function(Backbone, sinon, MessageView) {
    'use strict';

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

        describe("initialization", function() {

            beforeEach(function() {
                this.spy = sinon.spy(MessageView.prototype, 
                    'flashFailMessage');
                this.view = new MessageView();
            });

            afterEach(function() {
                MessageView.prototype.flashFailMessage.restore();
                this.view = null;
            });

            it("should respond to a seedQueryFailure event", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('seedQueryFailure');
                expect(this.spy.callCount).to.equal(1);
            });

            it("should respond to a clusterQueryFailure event", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('clusterQueryFailure');
                expect(this.spy.callCount).to.equal(1);
            });

        });
    });
});