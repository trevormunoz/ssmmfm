/* global define */

define([
        'mocha',
        'chai',
        '../../src/js/models/item.js'
], function(mocha, chai, MenuItem) {
    'use strict';

    var expect = chai.expect;
    mocha.setup("bdd");

    describe("Item Model", function() {

        describe("creation", function() {
            it('can be instantiated', function() {

                var item = new MenuItem();
                expect(item).to.be.ok;
            });

            it('can be instantiated w/supplied values', function() {
                var item = new MenuItem({
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
    });

});