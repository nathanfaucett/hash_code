var WeakMapPolyfill = require("@nathanfaucett/weak_map_polyfill"),
    isNumber = require("@nathanfaucett/is_number"),
    isString = require("@nathanfaucett/is_string"),
    isObject = require("@nathanfaucett/is_object"),
    isFunction = require("@nathanfaucett/is_function"),
    numberHashCode = require("@nathanfaucett/number-hash_code"),
    stringHashCode = require("@nathanfaucett/string-hash_code");


var WEAK_MAP = new WeakMapPolyfill(),
    HASH_UID = 1;


module.exports = hashCode;


function hashCode(value) {
    if (value === false || value === null || value === undefined) {
        return 0;
    } else {
        if (isFunction(value.valueOf)) {
            value = value.valueOf();

            if (value === false || value === null || value === undefined) {
                return 0;
            }
        }

        if (value === true) {
            return 1;
        } else if (isNumber(value)) {
            return numberHashCode(value);
        } else if (isString(value)) {
            return stringHashCode(value);
        } else if (isFunction(value.hashCode)) {
            return value.hashCode();
        } else if (isObject(value)) {
            return getObjectHashCode(value);
        } else if (isFunction(value.toString)) {
            return stringHashCode(value.toString());
        } else {
            throw new Error("Value " + value + " cannot be hashed.");
        }
    }
}

function getObjectHashCode(value) {
    var hashCode = getHashCode(value);

    if (hashCode === undefined) {
        return setHashCode(value);
    } else {
        return hashCode;
    }
}

function getHashCode(value) {
    return WEAK_MAP.get(value);
}

function setHashCode(value) {
    var hashCode = HASH_UID++;

    if (HASH_UID & 0x40000000) {
        HASH_UID = 0;
    }

    WEAK_MAP.set(value, hashCode);

    return hashCode;
}
