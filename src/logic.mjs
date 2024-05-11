import { min, trim } from "lodash";


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

export function NextPhase(matrix_og, trim_shape=false){
//      Any live cell with fewer than two live neighbors dies, as if by underpopulation.
//      Any live cell with two or three live neighbors lives on to the next generation.
//      Any live cell with more than three live neighbors dies, as if by overpopulation.
//      Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

    if(trim_shape){
        // add extra perimeter of "b" (in case shape grows)
        for(let i=0; i<matrix_og.length; i++){
            matrix_og[i].unshift("b");
            matrix_og[i].push("b");
        }
        let temp = [];
        for(let i=0; i<matrix_og[0].length; i++){
            temp.push("b");
        }
        matrix_og.unshift(temp);
        matrix_og.push(temp);
    }

    let matrix = structuredClone(matrix_og);
    for(let i=0; i<matrix_og.length; i++){
        for(let j=0; j<matrix_og[0].length; j++){
            let neighbours = GetNoOfNeighbours(matrix_og, j, i);
            if(neighbours == 3){
                if(matrix_og[i][j] == "b"){
                    matrix[i][j] = "o";
                }
            } else if(neighbours > 3 || neighbours < 2){
                matrix[i][j] = "b";
            }
        }   
    }
    if(trim_shape){
        let test = [["b", "o", "b"], ["b", "o", "b"], ["b", "o", "b"]];
        matrix = TrimShape(matrix);
        return test;
    }
    return matrix;
}

function GetNoOfNeighbours(matrix, x, y){
    let max_x = matrix[0].length-1;
    let max_y = matrix.length-1;
    let res = 0;
    for(let i=-1; i<2; i++){
        for(let j=-1; j<2; j++){
            let x_ = x + j;
            let y_ = y + i;
            if((x_==x && y_==y) || x_<0 || x_>max_x || y_<0 || y_>max_y){
                continue;
            }
            res += (matrix[y_][x_]=="o" ? 1 : 0);
        }   
    }
    return res;
}

function TrimShape(matrix){
    let min_x = MinCoordX(matrix);
    let max_x = MaxCoordX(matrix);
    let max_y = MaxCoordY(matrix);
    return matrix;
}

function MinCoordX(matrix){
    let res = matrix[0].length-1;
    for(let i=0; i<matrix.length; i++){
        for(let j=0; j<matrix[0].length; j++){
            if(matrix[i][j] == "o"){
                res = Math.min(res, j);
                break;
            }
        }   
    }
    return res;
}

function MaxCoordX(matrix){
    let res = 0;
    for(let i=0; i<matrix.length; i++){
        for(let j=matrix[0].length; j>=0; j--){
            if(matrix[i][j] == "o"){
                res = Math.max(res, j);
                break;
            }
        }   
    }
    return res;
}

function MaxCoordY(matrix){
    let res = 0;
    for(let j=0; j<matrix[0].length; j++){
        for(let i=matrix.length-1; i>=0; i--){
            if(matrix[i][j] == "o"){
                res = Math.max(res, j);
                break;
            }
        }   
    }
    return res;
}