import { Board } from "./board.mjs";
import fs from 'fs';

export function readContents(path) {
    if(!path){
        return;
    }
    let contents = fs.readFileSync(path).toString().split("\n");

    let n = contents.length;

    let size;
    let data
    for(let i=0; i<contents.length; i++){
        if(contents[i][0] == "#"){
            continue;
        } else if(contents[i][0] == "x"){
            size = contents[i];
        } else if(!data){
            data = contents[i];
        }
    }

    let res = {
        "size": size,
        "data": data
    }
    return res;
}


export function parseXandY(contents){
    let str = contents["size"];
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
    
    // do not use structuredClone. False values in memory.
    let matrix = JSON.parse(JSON.stringify(matrix_og))
    
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
    matrix = TrimShape(matrix);
    return matrix;
}

function GetNoOfNeighbours(matrix, x, y){
    let max_x = matrix[0].length-1;
    let max_y = matrix.length-1;
    let res = 0;
    for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){
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
    // trim matrix to that only shape is left, without additional "b" beyond shape perimeter
    let min_x = MinCoordX(matrix);
    let max_x = MaxCoordX(matrix);
    let min_y = MinCoordY(matrix);
    let max_y = MaxCoordY(matrix);
    matrix = matrix.slice(min_y, max_y+1);
    for(let i=0; i<matrix.length; i++){
        matrix[i] = matrix[i].slice(min_x, max_x+1);
    }
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

function MinCoordY(matrix){
    let res = matrix.length;
    for(let j=0; j<matrix[0].length; j++){
        for(let i=0; i<matrix.length; i++){
            if(matrix[i][j] == "o"){
                res = Math.min(res, i);
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
                res = Math.max(res, i);
                break;
            }
        }   
    }
    return res;
}


export function CalculateResultPattern(path, no){
    let contents = readContents(path, no);
    let board = new Board();
    board.AddShape(path);
    for(let i=0; i<no; i++){
        board.NextPhase();
    }
    return board;
}

export function GenerateFullRle(path, no){
  let res = "";
	let board = CalculateResultPattern(path, no)
	let comment = "#C generated by cli app\n"  
	let size = `x = ${board.cols}, y = ${board.rows}, rule = B3/S23\n`;
	let rleStr = board.ToRleString();
	res += comment;
	res += size;
	res += rleStr;
	return res;
}