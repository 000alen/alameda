export function scopedEval<T = any>(scope: Record<string, any>, code: string): T {
  const definitions = Object.keys(scope)
    .map((key) => `var ${key} = this.${key}`)
    .join(";");

  const body = `"use strict";${definitions};${code}`;

  return Function(body).bind(scope)();
}
