import { describe, test } from "vitest";
import { expect } from "chai";
import { readContents } from "../src/logic.mjs"

describe("Example test fixture", () => {
  test.skip("Example test", () => {
    expect(sum(1, 2)).to.equal(3);
  });

  test("open file and read rle data", () =>{
    expect(readContents("test/glider.rle.txt")).to.equal("bob$2bo$3o!");
  })
});
