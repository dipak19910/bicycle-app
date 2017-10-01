// eslint-disable-next-line
import React from "react"
var google =window.google
var ObjConstructor = {}.constructor;

var isJSONObject = (obj)=> {
    if (obj === undefined || obj === null || obj === true || obj === false || typeof obj !== "object" || Array.isArray(obj)) {
        return false;
    } else if (obj.constructor === ObjConstructor || obj.constructor === undefined) {
        return true;
    } else {
        return false;
    }
};
export function getDirection({source, destination},callback) {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
        origin: new google.maps.LatLng(source.lat, source.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            callback(null, result);
        } else {
            console.error(`error fetching directions ${result}`);
            callback(result)
        }
    });
}

export function deepEqual (first, second)  {
    if (!first || !second) {
        return first === second;
    }
    if (first === second) {
        return true;
    } else if ((Array.isArray(first)) && (Array.isArray(second))) {
        var firstLength = first.length;
        var secondLength = second.length;
        if (firstLength !== secondLength) {
            return false;
        } else {
            for (var i = 0; i < firstLength; i++) {
                if (!deepEqual(first[i], second[i])) {
                    return false
                }
            }
            return true;
        }
    } else if ((typeof first === typeof second) && typeof first === "number" && isNaN(first) && isNaN(second)) {
        return true;
    } else if (first instanceof Date && second instanceof Date) {
        if (first.getTime() === second.getTime()) {
            return true;
        } else {
            return false;
        }

    } else if (isJSONObject(first) && isJSONObject(second)) {
        var firstKeys = Object.keys(first);
        var secondKeys = Object.keys(second);
        if (firstKeys.length !== secondKeys.length) {
            return false;
        } else {
            for (var j = 0; j < firstKeys.length; j++) {
                var keyName = firstKeys[j];
                if (!deepEqual(first[keyName], second[keyName])) {
                    return false;
                }
            }
            return true;
        }
    } else if (first.toString && second.toString && first.toString() === second.toString()) {
        /*Check to validate objectid case from effects,on server check for objectId*/
        return true;
    } else {
        return false;
    }
}