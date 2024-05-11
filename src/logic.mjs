import { trim } from "lodash";


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
    let str = contents["size"];
    str = trim(str);
    let n = str.length;
    let x;
    let y;
    let x_parsed = false;
    let y_parsed = false;
    
    for(let i=0; i<n; i++){
        if(str[i] == " "){
            continue;
        }
        if(str[i]=="="){
            if(!x_parsed){
                x = parseInt(str[i+2]);
                x_parsed = true;
            } else if(!y_parsed){
                y = parseInt(str[i+2]);
                y_parsed = true;
                break;
            }
        }
    }
    return { "x": x, "y": y};
}


export function RleStrToArray(rle, x, y){
    let shape = [];
    let row = [];
    let n = 0;

    for(let i=0; i<rle.length; i++){
        let s = rle[i];
        if(s == '$' || s == '!'){
            shape.push(row);
            row = [];
            n = 0;
        } else if(!parseInt(s)){
            if(n <= 1){
                row.push(s);
            } else {
                while(n > 0){
                    n -= 1;
                    row.push(s);
                }
            }
        } else {
            n = parseInt(s);
        }
    }
    return shape;
}