/* jshint shadow:true */
/* exported timeStamp,getAggregatedDishes */

function timeStamp() {
    var now = new Date();
    var date = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }

    for ( var i = 1; i < 3; i++ ) {
        if ( date[i] < 10 ) {
            date[i] = "0" + date[i];
        }
    }

    return date.join('-') + "T" + time.join(':');
}

function getAggregatedDishes(fingerprint) {
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

    return JSON.stringify(queryObj);
}