/* jshint shadow:true */
/* exported getRandomSeed, getAggregatedDishes */

function getRandomSeed() {
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