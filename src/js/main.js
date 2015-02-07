/* global require */

require(['config'], function() {

    require([
        'src/js/views/app-view',
        'src/js/collections/seeds'
    ], function(AppView, Seeds) {
        'use strict';

        new AppView({collection: Seeds});

    });
});