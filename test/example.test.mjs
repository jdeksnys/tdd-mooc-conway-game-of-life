import { describe, test } from "vitest";
import { expect, equalShape } from "chai";
import { readContents, parseXandY } from "../src/logic.mjs"
import { Board } from "../src/board.mjs";




describe("Example test fixture", () => {
  test.skip("Example test", () => {
    expect(sum(1, 2)).to.equal(3);
  });

  test("open file and read all contents", () =>{
    let res = readContents("test/glider.rle.txt");
    expect(res["data"]).to.equal("bob$2bo$3o!");
  })

  test("readXandY", () => {
    let contents = readContents("test/glider.rle.txt");
    let res = parseXandY(contents);
    expect(res["x"]).to.equal(3);
    expect(res["y"]).to.equal(3);
  })

  test("create empty board", () => {
    let board = new Board(5,5);
    expect(board.toString()).to.be.equalShape(
      `bbbbb
       bbbbb
       bbbbb
       bbbbb
       bbbbb`);
  })

  test("RLE string onto board [glider]", () => {
    let board = new Board(5,5);
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `bbbbb
       bbobb
       bbbob
       booob
       bbbbb`);
  })

  test("RLE string onto board [blinker]", () => {
    let board = new Board(5,5);
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `bbbbb
       bbbbb
       booob
       bbbbb
       bbbbb`);
  })

  test.skip("RLE string onto board [block]", () => {
    let board = new Board(5,5);
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `bbbbb
       boobb
       boobb
       bbbbb
       bbbbb`);
  })
});
