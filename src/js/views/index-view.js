/*global define*/

define([
    'backbone'
],

function(Backbone) {
    'use strict';
    
    var IndexView = Backbone.View.extend ({
    
        tagName: 'div',
        className: 'index-output'
        
        });
        
    return IndexView;
    
});

  