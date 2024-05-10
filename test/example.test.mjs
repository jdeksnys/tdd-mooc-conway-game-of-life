import { describe, test } from "vitest";
import { expect } from "chai";
import { readContents, parseXandY } from "../src/logic.mjs"

describe("Example test fixture", () => {
  test.skip("Example test", () => {
    expect(sum(1, 2)).to.equal(3);
  });

  test("open file and read all contents", () =>{
    let res = readContents("test/glider.rle.txt");
    expect(res["data"]).to.equal("bob$2bo$3o!");
  })

  test.skip("readXandY", () => {
    let contents = `
      #N Glider
      #O Richard K. Guy
      #C The smallest, most common, and first discovered spaceship. Diagonal, has period 4 and speed c/4.
      #C www.conwaylife.com/wiki/index.php?title=Glider
      x = 3, y = 3, rule = B3/S23
      bob$2bo$3o!
    `;
    
    let res = parseXandY(contents);
    expect(res["x"]).to.equal(3);
    expect(res["y"]).to.equal(3);
  })
});
