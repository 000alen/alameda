import * as alameda from "@000alen/alameda";
import fs from "fs";
import path from "path";

async function main() {
  const payload = await fs.promises.readFile(
    path.resolve("../lib/dist/index.js"),
    {
      encoding: "utf-8",
    }
  );

  alameda.scopedEval(
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
