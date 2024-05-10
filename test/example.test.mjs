import { describe, test } from "vitest";
import { expect } from "chai";
import { sum } from "../src/example.mjs";
import { readContents } from "../src/app.mjs"

describe("Example test fixture", () => {
  test.skip("Example test", () => {
    expect(sum(1, 2)).to.equal(3);
  });

  test("open file and read rle data", () =>{
    expect(readContents("test/glider.rle.txt")).to.equal("bob$2bo$3o!");
  })
});
