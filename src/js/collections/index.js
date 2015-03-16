/* global define */

define([
        'backbone',
        'src/js/models/term'
], function(Backbone, IndexTerm) {
    'use strict';

    var Index = Backbone.Collection.extend({
        model: IndexTerm,
        url: 'http://api.publicfare.org/public_fare/term/_search',

        parse: function(response) {
            return response.hits.hits;
        },

        save: function() {
            
            // Turn the array of models into an
            // array of actions for bulk upload
            var forUpload = _.map(this.models, 
                    function(model){
                        var esAction = {
                            "index": "public_fare",
                            "type": "term",
                            "_source": model
                        };

                        return JSON.stringify(esAction);
                    });
            
            var savePromise = $.ajax({
                type: 'POST',
                url: 'http://api.publicfare.org/_bulk',
                contentType: 'application/json',
                processData: false,
                xhrFields: {
                    withCredentials: true
                },
                data: forUpload
            });

            savePromise.done(function(data) {
                window.console.log(data);
            });

            savePromise.fail(function(data) {
                window.console.log(data);
            });
        },
    });

    return Index;
});