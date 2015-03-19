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
                this.setEntryDishesStub = sinon.stub(IndexView.prototype, 'setEntryDishes');
                var indexCollex = new Index();
                this.view = new IndexView({collection: indexCollex});
            });

            afterEach(function () {
                IndexView.prototype.setEntryDishes.restore();
                this.view.remove();
                this.view = null;
            });

            it('should add a term', function () {
                var dummyFingerprint = 'radishes';
                this.view.createEntry(dummyFingerprint);
                
                expect(this.view.collection.length).to.equal(1);
                var item = this.view.collection.shift();
                
                expect(item).to.be.instanceOf(Object);
                expect(item.get('date_created')).to.be.ok;
                expect(item.get('fingerprint_value')).to.equal(dummyFingerprint);
                expect(item.get('index_term')).to.not.be.ok;
                expect(item.get('dishes_aggregated')).to.not.be.ok;
            });

            // How to stub out for setEntryDishes to prevent http

            // it('should update a term', function () {

            //     var dummyFingerprint = 'cup per tea'
            //     , dummyIndexTerm = 'cup of tea\t';

            //     this.view.createEntry(dummyFingerprint);
            //     this.view.setEntryTerm(dummyIndexTerm);

            //     expect(this.setEntryDishesStub.calledOnce).to.be.true;

            //     var item = this.view.collection.shift();
            //     expect(item).to.be.instanceOf(Object);
            //     expect(item.get('index_term')).to.be.ok;
            //     expect(item.get('index_term')).to.equal('cup of tea');

            //     expect(item.get('dishes_aggregated')).to.not.be.ok;

            // });

            // it('should trigger dish aggregation on term update', function () {

            //     var dummyFingerprint = 'cup per tea'
            //     , dummyIndexTerm = 'cup of tea\t';

            //     this.view.createEntry(dummyFingerprint);
            //     this.view.setEntryTerm(dummyIndexTerm);

            //     expect(this.setEntryDishesStub.callCount).to.equal(1);
            //     var stubCall = this.view.setEntryDishes.getCall(0);
            //     expect(stubCall.args[0]).to.equal('cup per tea');

            // });

        });

    });
});