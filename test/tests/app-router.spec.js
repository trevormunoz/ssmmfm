/* global define */

define([
        'sinon',
        '../../src/js/routers/app-router'
], function(sinon, AppRouter) {
    'use strict';

    describe('Routers: AppRouter', function () {
        describe('creation', function () {

            beforeEach(function () {
                this.stub = sinon.stub(AppRouter.prototype, 'initialize')
                this.router = new AppRouter();
            });

            afterEach(function () {
                AppRouter.prototype.initialize.restore();
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