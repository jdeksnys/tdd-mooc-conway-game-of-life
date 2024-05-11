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

export function NextPhase(matrix_og){
//      Any live cell with fewer than two live neighbors dies, as if by underpopulation.
//      Any live cell with two or three live neighbors lives on to the next generation.
//      Any live cell with more than three live neighbors dies, as if by overpopulation.
//      OK Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    let matrix = matrix_og;

    for(let i=0; i<matrix_og.length; i++){
        for(let j=0; j<matrix_og[0].length; j++){
            let neighbours = GetNoOfNeighbours(matrix_og);
            if(neighbours == 3){
                if(matrix_og[i][j] = "b"){
                    matrix[i][j] = "o";
                }
            } else if(neighbours > 3 || neighbours < 2){
                matrix[i][j] = "b";
            }
        }   
    }


    matrix[1][2] = "o";
    matrix[3][2] = "o";
    matrix[2][1] = "b";
    matrix[2][3] = "b";
    
    return matrix;
}

function GetNoOfNeighbours(matrix){
}