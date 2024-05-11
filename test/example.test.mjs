import { describe, test } from "vitest";
import { expect, equalShape } from "chai";
import { readContents, parseXandY } from "../src/logic.mjs"
import { Board } from "../src/board.mjs";
import { CalculateResultPattern, GenerateFullRle } from "../src/logic.mjs";




describe("File import and parsing", () => {
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
  
  test("open file and read all contents [reshuffled]", () =>{
    let res = readContents("test/glider_shuffled.rle.txt");
    expect(res["data"]).to.equal("bob$2bo$3o!");
  })

  test("readXandY [shuffled]", () => {
    let contents = readContents("test/glider_shuffled.rle.txt");
    let res = parseXandY(contents);
    expect(res["x"]).to.equal(3);
    expect(res["y"]).to.equal(3);
  })

  test("RLE string onto board [glider]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `bob
       bbo
       ooo`);
  })

  test("RLE string onto board [blinker]", () => {
    let board = new Board();
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `ooo`);
  })

  test("RLE string onto board [block]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `oo
       oo`);
  })

  test("RLE string onto board [block]", () => {
    let board = new Board(2,2);
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    expect(board.toString()).to.be.equalShape(
      `oo
       oo`);
  })
});

describe("Shape phases", () => {
  test("1st shape pos [blinker]", () => {
    let board = new Board();
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `o
       o
       o`);
  })

  test("2nd shape phase [blinker]", () => {
    let board = new Board();
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `ooo`);
  })

  test("3rd shape phase [blinker]", () => {
    let board = new Board();
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    board.NextPhase();
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `o
       o
       o`);
  })

  test("1st shape phase [glider]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `obo
       boo
       bob`);
  })

  test("2nd shape phase [glider]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `bbo
       obo
       boo`);
  })

  test("3rd shape phase [glider]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    board.NextPhase();
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `obb
       boo
       oob`);
  })

  test("1st shape phase [block]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `oo
       oo`);
  })
  
  test("2nd shape phase [block]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `oo
       oo`);
  })

  test("3rd shape phase [block]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    board.NextPhase();
    board.NextPhase();
    board.NextPhase();
    expect(board.toString()).to.be.equalShape(
      `oo
       oo`);
  })
});


describe("Trim shape after phases change", () => {
  
  test("1st shape pos [blinker][trim]", () => {
    let board = new Board();
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    expect(board.toString()).to.be.equalShape(
      `o
       o
       o`);
  })

  test("2nd shape pos [blinker][trim]", () => {
    let board = new Board();
    let filePath = "test/blinker.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    board.NextPhase(true);
    expect(board.toString()).to.be.equalShape(
      `ooo`);
  })

  test("1st shape pos [glider][trim]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    expect(board.toString()).to.be.equalShape(
      `obo
       boo
       bob`);
  })

  test("2nd shape pos [glider][trim]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    board.NextPhase(true);
    expect(board.toString()).to.be.equalShape(
      `bbo
       obo
       boo`);
  })

  test("1st shape pos [block][trim]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    expect(board.toString()).to.be.equalShape(
      `oo
       oo`);
  })
});


describe("Shape matrix to RLE string", () => {

  test("1st shape phase [glider][trim]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    expect(board.ToRleString()).to.equal("obo$b2o$bob!");
  })

  test("2nd shape phase [glider][trim]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    board.NextPhase(true);
    expect(board.ToRleString()).to.equal("2bo$obo$b2o!");
  })

  test("3rd shape phase [glider][trim]", () => {
    let board = new Board();
    let filePath = "test/glider.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    board.NextPhase(true);
    board.NextPhase(true);
    expect(board.ToRleString()).to.equal("o2b$b2o$2ob!");
  })

  test("1st shape phase [block][trim]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    expect(board.ToRleString()).to.equal("2o$2o!");
  })

  test("2nd shape phase [block][trim]", () => {
    let board = new Board();
    let filePath = "test/block.rle.txt";
    board.AddShape(filePath);
    board.NextPhase(true);
    board.NextPhase(true);
    expect(board.ToRleString()).to.equal("2o$2o!");
  })
});


describe("Combine all logic", () => {
  test("path+number -> rle string", () => {
    let path = "test/glider.rle.txt";
    let no = 3;
    expect(CalculateResultPattern(path, no).ToRleString()).to.equal("o2b$b2o$2ob!");
  })

  test("path+number -> rle string", () => {
    let path = "test/block.rle.txt";
    let no = 1000;
    expect(CalculateResultPattern(path, no).ToRleString()).to.equal("2o$2o!");
  })

  test("path+number -> rle string", () => {
    let path = "test/blinker.rle.txt";
    let no = 1000;
    expect(CalculateResultPattern(path, no).ToRleString()).to.equal("3o!");
  })

  test("path+number -> full rle result (rle+comments+size)", () => {
    let path = "test/blinker.rle.txt";
    let no = 3;
    expect(GenerateFullRle(path, no)).to.equal(`
#C generated by cli app
x = 3, y = 3, rule = B3/S23
o2b$b2o$2ob!
    `);
  })
});