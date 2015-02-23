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

function checkForDupe(seed) {
    var result = this.collection.where({key: seed});
    if (result === []) {
        return 0;
    } else {
        return 1;
    }
}