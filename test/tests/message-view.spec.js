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
                    'render');
                this.view = new MessageView();
            });

            afterEach(function() {
                MessageView.prototype.render.restore();
                this.view.remove();
                this.view = null;
            });

            it("should respond to raiseError events: failedSeedQuery", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('raiseError', 'failedSeedQuery');
                var testArgs = {'parent': '#message-body',
                                'message': "We're sorry—the server appears to be down. Try reloading this page."};
                expect(this.spy.alwaysCalledWithExactly(testArgs)).to.be.true;

            });

            it("should respond to raiseError events: duplicateSeed", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('raiseError', 'duplicateSeed');
                var testArgs = {'parent': '#message-body',
                                'message': "Skipping duplicate …"};
                expect(this.spy.alwaysCalledWithExactly(testArgs)).to.be.true;

            });

            it("should respond to raiseError events: getFacetsFailed", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('raiseError', 'getFacetsFailed');
                var testArgs = {'parent': '#message-body',
                                'message': 'We failed to get the facets.'};
                expect(this.spy.alwaysCalledWithExactly(testArgs)).to.be.true;

            });

            it("should respond to raiseError events: mltQueryFailed", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('raiseError', 'mltQueryFailed');
                var testArgs = {'parent': '#message-body',
                                'message': 'We did not find more like this. Retrying …'};
                expect(this.spy.alwaysCalledWithExactly(testArgs)).to.be.true;

            });

            it("should respond to raiseError events: unexpected value", function() {

                expect(this.spy).to.not.have.been.called;
                Backbone.trigger('raiseError', 'unknownError');
                var testArgs = {'parent': '#message-body',
                                'message': 'Something went wrong. Try reloading the page.'};
                expect(this.spy.alwaysCalledWithExactly(testArgs)).to.be.true;

            });

        });

        describe('render', function () {

            before(function () {
                this.$fixture = $('<div id="message-view-fixture"></div>');
            });

            beforeEach(function () {
                this.$fixture.empty().appendTo($('#sandbox'));
                this.view = new MessageView();
            });

            afterEach(function () {
                this.view.remove();
                this.view = null;
            });

            after(function () {
                $('#sandbox').empty();
            });

            it('should render the correct HTML for fingerprints', function () {
                this.$fixture.append('<div id="message-body"></div>')
                Backbone.trigger('fingerprintSuccess', 'boiled potatoes');

                expect(this.$fixture[0].children[0].firstChild.tagName).to.equal('P');
                expect(this.$fixture[0].children[0].firstChild.textContent).to.equal('fingerprint: boiled potatoes');
            });
            
            it('should render the correct HTML for messages: known error', function () {
                this.$fixture.append('<div id="message-body"></div>')
                Backbone.trigger('raiseError', 'failedSeedQuery');

                expect(this.$fixture[0].children[0].firstChild.tagName).to.equal('P');
                expect(this.$fixture[0].children[0].firstChild.textContent).to.equal("We're sorry—the server appears to be down. Try reloading this page.");
            });

            it('should render the correct HTML for messages: unknown error', function () {
                this.$fixture.append('<div id="message-body"></div>')
                Backbone.trigger('raiseError', 'strangeError');

                expect(this.$fixture[0].children[0].firstChild.tagName).to.equal('P');
                expect(this.$fixture[0].children[0].firstChild.textContent).to.equal('Something went wrong. Try reloading the page.');
            });

            it('should render the correct HTML for stats', function () {
                this.$fixture.append('<div id="stats"></div>');
                Backbone.trigger('entryAdded', 7);

                expect(this.$fixture[0].children[0].firstChild.tagName).to.equal('P');
                expect(this.$fixture[0].children[0].firstChild.textContent).to.equal('7 clusters reviewed this session');
            });
        });
    });
});