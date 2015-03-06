/* global define */

define([
        'sinon',
        '../../src/js/models/item',
        'fixtures/es/fixture',
        'helpers/fakeServer-helper'
], function(sinon, MenuItem) {
    'use strict';

    describe("Model: Item", function() {

        describe("creation", function() {
            it('can be instantiated', function() {

                var item = new MenuItem();
                expect(item).to.be.ok;
            });

            it('can construct a valid URL given an id', function() {
                var item = new MenuItem({id: "184236"});

                expect(item.url()).to.equal('http://52.0.128.38/menus/item/184236');
            });

            it('can be instantiated w/supplied values', function() {
                var item = new MenuItem({
                                    id: 1,
                                    dish_name: 'Consomme printaniere royal',
                                    dish_id: 1,
                                    item_id: 73003
                                    });

                expect(item).to.be.ok;
                expect(item.get('dish_name')).to.equal('Consomme printaniere royal');
                expect(item.get('dish_id')).to.equal(1);
                expect(item.get('item_id')).to.equal(73003);

            });
        });

        describe("population from server", function() {

            beforeEach(function() {
                this.fixture = this.fixtures.MenuItem.valid;
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                        "GET",
                        "http://52.0.128.38/menus/item/" + this.fixture._id,
                        this.validResponse(this.fixture)
                    );
                this.item = new MenuItem({id: this.fixture._id});
            });

            afterEach(function() {
                this.server.restore();
            });

            describe("fetch", function(){
                it("should make the correct request", function() {
                    this.item.fetch();

                    expect(this.server.requests.length).to.equal(1);
                    expect(this.server.requests[0].method).to.equal("GET");
                    expect(this.server.requests[0].url).to.equal("http://52.0.128.38/menus/item/" + this.fixture._id);
                });

                it("should parse an item from response", function(done){
                    this.item.fetch({id: this.fixture._id});
                    this.server.respond();

                    var fetchedSource = this.item.get("_source");
                    expect(fetchedSource.dish_id).to.equal(
                        this.fixture._source.dish_id
                        );
                    expect(fetchedSource.dish_name).to.equal(
                        this.fixture._source.dish_name
                        );

                    done();
                });
            });
        });
    });

});