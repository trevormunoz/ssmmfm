/* global define */

define(['underscore'], function(_) {
    'use strict';

    var Queries = {

        getRandomSeed: function() {
            //Pick a random number between 0 & length of
            // document collection
            var seedVal = _.random(0, 1321937);

            // Build up a query using this random id as seed
            var queryObj = {};

            queryObj.fields = ["dish_name_fingerprint"];
            queryObj.query = {};

            queryObj.query.function_score = {};
            queryObj.query.function_score.query = {"match_all": {}};
            queryObj.query.function_score.functions = [{"random_score": {"seed": seedVal}}];

            return queryObj;   
        },

        getAggByFingerprint: function(fingerprint) {
            // Build up a query w/a filter and an aggregation
            var queryObj = {};
            var query = {};
            var aggs = {};

            // Filter to include only documents with this fingerprint
            query.filtered = {};
            query.filtered.query = { "match_all": {} };
            query.filtered.filter = { "term": {
                "dish_name_fingerprint": fingerprint}
            };

            // Aggregate by dish id
            aggs.dish = {};
            aggs.dish.terms = { "field": "dish_id", "size": 0};

            //Sub-aggregation to get names & menus appeared
            var subAgg = {};
            subAgg.top_names = { "top_hits": {} };
            subAgg.top_names.top_hits.size = 1;
            subAgg.top_names.top_hits.sort = [ {"dish_menus_appeared": {"order": "desc"}} ];
            subAgg.top_names.top_hits._source = {"include": ["dish_name", "dish_menus_appeared", "menu_page_uri"]};

            aggs.dish.aggregations = subAgg;

            // Pull it all together
            queryObj.size = 0;
            queryObj.query = query;
            queryObj.aggregations = aggs;
            
            return queryObj;
        },

        getAggregatedDishes: function(fingerprint) {
            var queryObj = {}
            , filterObj = {}
            , aggObj = {};

            filterObj.filter = {"term": {"dish_name_fingerprint": fingerprint}};
            aggObj.dishes = {};
            aggObj.dishes.terms = {"field": "dish_id", "size": 0};

            queryObj.size = 0;
            queryObj.query = {};
            queryObj.query.filtered = filterObj;
            queryObj.aggregations = aggObj;

            return queryObj;
        },

        getMlt: function(idList) {
            // Build up a query object
            var queryObj = {}
            , query = {}
            , mltClause = {};

            mltClause.fields = ["menu_sponsor", "menu_location"];
            mltClause.ids = idList;
            mltClause.min_term_freq = 1;
            mltClause.min_doc_freq = 1;

            query.mlt = mltClause;
            queryObj.query = query;

            return queryObj;
        },        

    }

    return Queries;
});
