/* global define */

define([
        'src/js/views/listRow-view',
        'src/js/models/dish'
], function(RowView, Dish) {
    'use strict';

    describe('View: List Row', function () {
        
        describe('creation', function () {
            
            before(function () {
                var dish = new Dish({
                    id: 384412,
                    name_value: 'Lemon sherbet',
                    menu_count: 7,
                    exemplar_doc: '1011951'
                });
                this.view = new RowView({model: dish});
            });

            after(function () {
                this.view.remove();
                this.view = null;
            });

            it('should exist', function () {
                expect(this.view).to.be.ok;
            });

            it('should be created with correct DOM element', function () {
                expect(this.view.$el[0].nodeName).to.equal('TD');
            });

            it('should be backed by a model', function () {
                expect(this.view.model).to.be.ok;
            });

            it('should have a template', function () {
                expect(this.view.listRowTemplate).to.be.ok;
            });
        });

        describe('render', function () {
            
            before(function () {
                this.$fixture = $('<div id="row-view-fixture"></div>');
            });

            beforeEach(function () {
                this.$fixture.empty().appendTo($('#sandbox'));

                var dish = new Dish({
                    id: 384412,
                    name_value: 'Lemon sherbet',
                    menu_count: 7,
                    exemplar_doc: '1011951'
                });
                this.view = new RowView({model: dish});
            });

            afterEach(function () {
                this.view.remove();
                this.view = null;
            });

            after(function () {
                $('#sandbox').empty();
            });

            it('should generate the correct HTML', function () {
                this.$fixture.append(this.view.render());

               expect(this.$fixture[0].firstChild.tagName).to.equal('TR');
               expect(this.$fixture[0].firstChild.id).to.equal('384412');

               expect(this.$fixture[0].firstChild.childNodes[1].textContent).to.equal('Lemon sherbet');

            });
        });
    });
});