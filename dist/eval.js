"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scopedEval = scopedEval;
function scopedEval(scope, code) {
    const definitions = Object.keys(scope)
        .map((key) => `var ${key} = this.${key}`)
        .join(";");
    const body = `"use strict";${definitions};${code}`;
    return Function(body).bind(scope)();
}
