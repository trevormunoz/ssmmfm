/* global define */

define([
        'src/js/models/fingerprint'
], function(Fingerprint) {
    'use strict';

    describe('Model: Fingerprint', function () {
        
        describe('creation', function () {
            
            it('should exist', function () {
                var fp = new Fingerprint();

                expect(fp).to.be.ok;

                fp.destroy();
                fp = null;
            }); 

        });


    });

});