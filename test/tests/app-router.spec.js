/* global define */

define([
        '../../src/js/routers/app-router'
], function(AppRouter) {
    'use strict';

    describe('Routers: AppRouter', function () {
        describe('creation', function () {

            beforeEach(function () {
                this.router = new AppRouter();
            });

            afterEach(function () {
                this.router = null;
            });

            it('should exist', function () {
                expect(this.router).to.be.ok;
            });

            it('should define a routes hash', function() {
                expect(this.router.routes).to.be.ok;
                expect(this.router.routes).to.be.instanceOf(Object);
            });
            
        });
    });
});