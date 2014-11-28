/* global define */

define(['mocha'], function(){
    'use strict';

    mocha.setup("bdd");

    beforeEach(function() {

        this.validResponse = function(responseText) {
            return [
                200,
                {"Content-Type": "application/json"},
                JSON.stringify(responseText)
            ];
        };
    });
});