"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentReplace = commentReplace;
exports.hasProp = hasProp;
exports.getOwn = getOwn;
exports.obj = obj;
exports.eachProp = eachProp;
exports.mixin = mixin;
exports.getGlobal = getGlobal;
exports.trimDots = trimDots;
const GLOBAL = this;
const hasOwn = Object.prototype.hasOwnProperty;
// Could match something like ')//comment', do not lose the prefix to comment.
function commentReplace(_match, singlePrefix) {
    return singlePrefix || "";
}
function hasProp(obj, prop) {
    return hasOwn.call(obj, prop);
}
function getOwn(obj, prop) {
    return obj && hasProp(obj, prop) && obj[prop];
}
function obj() {
    return Object.create(null);
}
/**
 * Cycles over properties in an object and calls a function for each
 * property value. If the function returns a truthy value, then the
 * iteration is stopped.
 */
function eachProp(obj, func) {
    var prop;
    for (prop in obj) {
        if (hasProp(obj, prop)) {
            if (func(obj[prop], prop)) {
                break;
            }
        }
    }
}
/**
 * Simple function to mix in properties from source into target,
 * but only if target does not already have a property of the same name.
 */
function mixin(target, source, force, deepStringMixin) {
    if (source) {
        eachProp(source, function (value, prop) {
            if (force || !hasProp(target, prop)) {
                if (deepStringMixin &&
                    typeof value === "object" &&
                    value &&
                    !Array.isArray(value) &&
                    typeof value !== "function" &&
                    !(value instanceof RegExp)) {
                    if (!target[prop]) {
                        target[prop] = {};
                    }
                    mixin(target[prop], value, force, deepStringMixin);
                }
                else {
                    target[prop] = value;
                }
            }
        });
    }
    return target;
}
// Allow getting a global that expressed in
// dot notation, like 'a.b.c'.
function getGlobal(value) {
    if (!value) {
        return value;
    }
    var g = GLOBAL;
    value.split(".").forEach(function (part) {
        g = g[part];
    });
    return g;
}
/**
 * Trims the . and .. from an array of path segments.
 * It will keep a leading path segment if a .. will become
 * the first path segment, to help with module name lookups,
 * which act like paths, but can be remapped. But the end result,
 * all paths that use this function should look normalized.
 * NOTE: this method MODIFIES the input array.
 * @param {Array} ary the array of path segments.
 */
function trimDots(ary) {
    var i, part, length = ary.length;
    for (i = 0; i < length; i++) {
        part = ary[i];
        if (part === ".") {
            ary.splice(i, 1);
            i -= 1;
        }
        else if (part === "..") {
            // If at the start, or previous value is still ..,
            // keep them so that when converted to a path it may
            // still work when converted to a path, even though
            // as an ID it is less than ideal. In larger point
            // releases, may be better to just kick out an error.
            if (i === 0 || (i === 1 && ary[2] === "..") || ary[i - 1] === "..") {
                continue;
            }
            else if (i > 0) {
                ary.splice(i - 1, 2);
                i -= 2;
            }
        }
    }
}
