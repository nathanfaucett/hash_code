var WeakMapPolyfill = require("weak_map_polyfill"),
    isNumber = require("is_number"),
    isString = require("is_string"),
    isFunction = require("is_function"),
    isBoolean = require("is_boolean"),
    isNullOrUndefined = require("is_null_or_undefined"),
    numberHashCode = require("number-hash_code"),
    booleanHashCode = require("boolean-hash_code"),
    stringHashCode = require("string-hash_code");


var WEAK_MAP = new WeakMapPolyfill(),
    HASH_UID = 1;


module.exports = hashCode;


function hashCode(value) {
    if (isNullOrUndefined(value)) {
        return 0;
    } else {
        if (isFunction(value.valueOf)) {
            value = value.valueOf();
            if (isNullOrUndefined(value)) {
                return 0;
            }
        }

        if (isBoolean(value)) {
            return booleanHashCode(value);
        } else if (isNumber(value)) {
            return numberHashCode(value);
        } else if (isString(value)) {
            return stringHashCode(value);
        } else if (isFunction(value.hashCode)) {
            return value.hashCode();
        } else {
            return getObjectHashCode(value);
        }
    }
}

function getObjectHashCode(value) {
    var hashCode = getHashCode(value);

    if (hashCode !== undefined) {
        return hashCode;
    } else {
        return setHashCode(value);
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
