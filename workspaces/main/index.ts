import * as alameda from "@000alen/alameda";
import fs from "fs";
import path from "path";

function safeEval(scope: Record<string, any>, script: string) {
  const definitions = Object.keys(scope)
    .map((key) => `var ${key} = this.${key}`)
    .join(";");

  const body = `"use strict";${definitions};${script}`;

  return Function(body).bind(scope)();
}

async function main() {
  const payload = await fs.promises.readFile(
    path.resolve("../lib/dist/index.js"),
    {
      encoding: "utf-8",
    }
  );

  safeEval(
    {
      define: alameda.define,
    },
    payload
  );

  const [lib] = await alameda.require(["lib"]);

  console.log(lib.name);
  console.log(lib.hello());
  console.log(lib.ping());
}

main().catch(console.error);
