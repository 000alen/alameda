export declare function commentReplace(_match: string, singlePrefix: string): string;
export declare function hasProp<T = any>(obj: T, prop: keyof T): boolean;
export declare function getOwn<T = any>(obj: Record<string, any>, prop: string): T | false;
export declare function obj(): any;
/**
 * Cycles over properties in an object and calls a function for each
 * property value. If the function returns a truthy value, then the
 * iteration is stopped.
 */
export declare function eachProp(obj: Record<string, any>, func: (value: any, prop: string) => boolean | void): void;
/**
 * Simple function to mix in properties from source into target,
 * but only if target does not already have a property of the same name.
 */
export declare function mixin(target: Record<string, any>, source: Record<string, any>, force: boolean, deepStringMixin: boolean): Record<string, any>;
export declare function getGlobal<T = any>(value: string): T;
/**
 * Trims the . and .. from an array of path segments.
 * It will keep a leading path segment if a .. will become
 * the first path segment, to help with module name lookups,
 * which act like paths, but can be remapped. But the end result,
 * all paths that use this function should look normalized.
 * NOTE: this method MODIFIES the input array.
 * @param {Array} ary the array of path segments.
 */
export declare function trimDots(ary: string[]): void;
export declare function makeShimExports(value: {
    init: () => any;
    exports: string;
}): () => any;
