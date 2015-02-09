/* global require */

require(['config'], function() {

    require([
        'src/js/views/app-view'
    ], function(AppView) {
        'use strict';

        new AppView();

    });
});