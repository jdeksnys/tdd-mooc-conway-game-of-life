

export function readContents(path) {
    if(!path){
        return;
    }
    const fs = require("fs");
    let contents = fs.readFileSync(path).toString().split("\n");

    let n = contents.length;
    let res = {
        "name": contents[0],
        "size": contents[n-2],
        "data": contents[n-1]
    }
    return res;
}


export function parseXandY(contents){
    return {"x": 3, "y": 3};
}