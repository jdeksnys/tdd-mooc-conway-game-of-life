import { readContents } from "./logic.mjs";

// const args = process.argv.slice(2);

export function importFile(filePath){
    let res = readContents(filePath);
    return res;
}