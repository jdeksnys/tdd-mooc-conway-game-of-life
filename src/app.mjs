

// const args = process.argv.slice(2);

export function readContents(path) {
    if(!path){
        return;
    }
    const fs = require("fs");
    let contents = fs.readFileSync(path).toString().split("\n");

    let n = contents.length;
    let data = contents[n-1];
    return data;
}