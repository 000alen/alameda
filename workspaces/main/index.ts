import * as alameda from "@000alen/alameda";

async function main() {
  // const [lib] = await alameda.require(["../lib/dist/index.js"]);

  // console.log(lib);

  // console.log(alameda);

  // @ts-ignore
  alameda.define("hello", {
    name: "hello",
  });

  console.log(await alameda.require(["hello"]));
}

main().catch(console.error);
