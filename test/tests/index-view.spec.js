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

        describe('enter/update terms', function () {
            
            beforeEach(function () {
                var indexCollex = new Index();
                this.view = new IndexView({collection: indexCollex});
            });

            afterEach(function () {
                this.view.remove();
                this.view = null;
            });

            it('should add a term', function () {
                var dummyFingerprint = 'radishes';
                this.view.createEntry(dummyFingerprint);
                
                expect(this.view.collection.length).to.equal(1);
                var item = this.view.collection.shift();
                
                expect(item).to.be.instanceOf(Object);
                expect(item).to.have.property("attributes");
                expect(item.attributes).to.have.property('date_created');
                expect(item.attributes).to.have.property('fingerprint_value', dummyFingerprint);
                expect(item.attributes).to.not.have.property('index_term');
                expect(item.attributes).to.not.have.property('dishes_aggregated');
            });

            it('should update a term', function () {
                this.server = sinon.fakeServer.create();
                // Server request is side effect; don't bother to send any data back
                this.server.respondWith(
                        "GET",
                        "http://52.0.128.38/menus/item/_search"
                    );

                var dummyFingerprint = 'cup per tea'
                , dummyIndexTerm = 'cup of tea\t';

                this.view.createEntry(dummyFingerprint);
                this.view.setEntryTerm(dummyIndexTerm);

                var item = this.view.collection.shift();
                expect(item).to.be.instanceOf(Object);
                expect(item).to.have.property("attributes");
                expect(item.get('index_term')).to.be.ok;
                expect(item.get('index_term')).to.equal('cup of tea');

                expect(item.attributes).to.not.have.property('dishes_aggregated');

                this.server.restore();
            });

        });

        describe('aggregate dishes by fingerprint', function () {

            beforeEach(function () {
                this.spy = sinon.spy(IndexView.prototype, 'setEntryDishes');
                var indexCollex = new Index();
                this.view = new IndexView({collection: indexCollex});
            });

            afterEach(function () {
                IndexView.prototype.setEntryDishes.restore();
                this.view.remove();
                this.view = null;
            });

            it('should trigger dish aggregation on term update', function () {
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://52.0.128.38/menus/item/_search"
                    );

                var dummyFingerprint = 'cup per tea'
                , dummyIndexTerm = 'cup of tea\t';

                this.view.createEntry(dummyFingerprint);
                this.view.setEntryTerm(dummyIndexTerm);

                expect(this.spy.callCount).to.equal(1);
                var spyCall = this.view.setEntryDishes.getCall(0);
                expect(spyCall.args[0]).to.equal('cup per tea');

                this.server.restore();
            });

        });
    });
});