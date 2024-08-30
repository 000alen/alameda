const GLOBAL = this;

const hasOwn = Object.prototype.hasOwnProperty;

// Could match something like ')//comment', do not lose the prefix to comment.
export function commentReplace(_match: string, singlePrefix: string) {
  return singlePrefix || "";
}

export function hasProp(obj: object, prop: PropertyKey) {
  return hasOwn.call(obj, prop);
}

export function getOwn<T = any>(obj: object, prop: PropertyKey): T | false {
  return obj && hasProp(obj, prop) && (obj[prop] as T);
}

export function obj() {
  return Object.create(null);
}

/**
 * Cycles over properties in an object and calls a function for each
 * property value. If the function returns a truthy value, then the
 * iteration is stopped.
 */
export function eachProp<T extends object>(
  obj: T,
  func: (value: any, prop: keyof T) => boolean | void
) {
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
export function mixin(target, source, force, deepStringMixin) {
  if (source) {
    eachProp(source, function (value, prop) {
      if (force || !hasProp(target, prop)) {
        if (
          deepStringMixin &&
          typeof value === "object" &&
          value &&
          !Array.isArray(value) &&
          typeof value !== "function" &&
          !(value instanceof RegExp)
        ) {
          if (!target[prop]) {
            target[prop] = {};
          }
          mixin(target[prop], value, force, deepStringMixin);
        } else {
          target[prop] = value;
        }
      }
    });
  }
  return target;
}

// Allow getting a global that expressed in
// dot notation, like 'a.b.c'.
export function getGlobal<T = any>(value: string): T {
  if (!value) {
    return value as T;
  }
  var g = GLOBAL;
  value.split(".").forEach(function (part) {
    g = g![part];
  });
  return g as T;
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
export function trimDots(ary: string[]) {
  var i,
    part,
    length = ary.length;
  for (i = 0; i < length; i++) {
    part = ary[i];
    if (part === ".") {
      ary.splice(i, 1);
      i -= 1;
    } else if (part === "..") {
      // If at the start, or previous value is still ..,
      // keep them so that when converted to a path it may
      // still work when converted to a path, even though
      // as an ID it is less than ideal. In larger point
      // releases, may be better to just kick out an error.
      if (i === 0 || (i === 1 && ary[2] === "..") || ary[i - 1] === "..") {
        continue;
      } else if (i > 0) {
        ary.splice(i - 1, 2);
        i -= 2;
      }
    }
  }
}

export function makeShimExports(value: { init: () => any; exports: string }) {
  function fn() {
    var ret;
    if (value.init) {
      ret = value.init.apply(GLOBAL, arguments as any);
    }
    return ret || (value.exports && getGlobal(value.exports));
  }
  return fn;
}
