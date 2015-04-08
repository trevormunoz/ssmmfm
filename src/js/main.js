/* global require */

require(['src/js/config'], function() {

    require([
        'src/js/routers/app-router'
    ], function(AppRouter) {
        'use strict';

        var router = new AppRouter();
        Backbone.history.start({pushState: true, root:'/ssmmfm/'});

    });
});