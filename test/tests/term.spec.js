/* global define */

define([
        'src/js/models/term'
], function(IndexTerm) {
    'use strict';

    describe('Model: Index Term', function () {
        
        describe('creation', function () {
            
            it('should exist', function () {
                var term = new IndexTerm();

                expect(term).to.be.ok;

                term.destroy();
                term = null;
            }); 

        });


    });

});