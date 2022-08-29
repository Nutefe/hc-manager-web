import _ from "lodash";

// Functions
export function debounce(func, delay = 500, maxWait = 1000) {
    if (maxWait === -1) {
        return _.debounce(func, delay);
    }

    return _.debounce(func, delay, { maxWait });
}

// Numbers
export function numberFormat(number) {
    if (!_.isNumber(number)) return 0;

    return new Intl.NumberFormat("fr-FR").format(number);
}

export function parseInteger(value) {
    return _.toInteger(value);
}

// Objects
export function cloneDeep(value) {
    return _.cloneDeep(value);
}

export function isEqual(first, second) {
    return _.isEqual(first, second);
}

// Strings
export function capitalize(str) {
    return _.upperFirst(str);
}

export function formatPhone(str) {
    return replace(str, /(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
}

export function replace(str, pattern, replacement) {
    return _.replace(str, pattern, replacement);
}


export function replaceAll(str, pattern, replacement) {
    return _.replaceAll(str, pattern, replacement);
}

export function replacePhone(str) {
    return replace(str, /\s+/g, "");
}

export function startCase(str) {
    if (!_.isString(str)) return "";

    str = str.trim().toLowerCase();

    return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
    );
}

export function truncate(
    str,
    length = 30,
    separator = /,? +/,
    omission = "..."
) {
    return _.truncate(str, {
        length,
        separator,
        omission,
    });
}

export function upperFirst(str) {
    if (!_.isString(str)) return "";

    str = str.trim().toLowerCase();
    return _.upperFirst(str);
}

export function convertToDouble(value) {
    value = parseInteger(value);
    return value;
}
