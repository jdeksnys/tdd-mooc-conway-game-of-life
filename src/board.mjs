import { parseXandY, readContents, RleStrToArray, NextPhase } from "./logic.mjs";

export class Board{
	rows;
	cols;
	matrix;

	constructor(m, n){
	}
	
	toString(){
		let res = "";
		for(let i=0; i<this.rows; i++){
			let row = "";
			for(let j=0; j<this.cols; j++){
				row += this.matrix[i][j];
			}
			res += row + "\n";
		}
		return res;
	}

	AddShape(filePath){
		let contents = readContents(filePath);
		let size = parseXandY(contents);
		this.InitEmptyMatrix(size["y"], size["x"]);
		let shape = RleStrToArray(contents["data"]);
		this.OverlayShapeToBoard(shape);
	}

	OverlayShapeToBoard(shape) {
		let board_centre_x = this.cols % 2 == 0
			? Math.floor(this.cols/2) - 1
			: Math.floor(this.cols/2);
		let board_centre_y = this.rows % 2 == 0
			? Math.floor(this.rows/2) - 1
			: Math.floor(this.rows/2);
		let shape_centre_x = shape[0].length % 2 == 0
			? Math.floor(shape[0].length/2) - 1
			: Math.floor(shape[0].length/2)
		let shape_centre_y = shape.length % 2 == 0
			? Math.floor(shape.length/2) - 1
			: Math.floor(shape.length/2);
		let x_start = board_centre_x - shape_centre_x;
		let y_start = board_centre_y - shape_centre_y;
		for(let i=0; i<shape.length; i++){
			for(let j=0; j<shape[0].length; j++){
				this.matrix[y_start + i][x_start + j] = shape[i][j];
			}	
		}
	}

	NextPhase(trim_shape=false){
		this.matrix = NextPhase(this.matrix, trim_shape);
		if(trim_shape){
			this.cols = this.matrix[0].length;
			this.rows = this.matrix.length;
		}
	}

	ToRleString(){
		let res = "";
		for(let i=0; i<this.rows; i++){
			let symbol;
			let c;
			for(let j=0; j<this.cols; j++){
				let s = this.matrix[i][j];
				if(j==0){
					symbol = s;
					c = 1;
					continue;
				}
				if(s == symbol){
					c += 1;
					if(j == this.cols-1){
						res += c==1 ? s : `${c}${s}`;
					}
				} else {
					if(j==this.cols-1){
						res += c==1 ? symbol : `${c}${symbol}`;
						res += s;
						symbol = s;
					} else {
						res += c==1 ? symbol : `${c}${symbol}`;
						symbol = s;
					}
				}
			}
			if(i == this.rows-1){
				res += "!";
			} else{
				res += "$";
			}
		}
		return res;
	}

	InitEmptyMatrix(rows, cols){
		this.rows = rows;
		this.cols = cols;
		this.matrix = [];
		for(let i=0; i<this.rows; i++){
			let row = [];
			for(let j=0; j<this.cols; j++){
				row.push("b");
			}
			this.matrix.push(row);
		}
	}
}