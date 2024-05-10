import { parseXandY, readContents } from "./logic.mjs";

export class Board{
	rows;
	cols;
	matrix;

	constructor(m, n){
		this.rows = m;
		this.cols = n;
		this.matrix = [];
		for(let i=0; i<this.rows; i++){
			let row = [];
			for(let j=0; j<this.cols; j++){
				row.push(".");
			}
			this.matrix.push(row);
		}
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
		let shape = [];

		for(let i=0; i<this.rows; i++){
			for(let j=0; j<this.cols; j++){
			}	
		}

		this.matrix[1][3] = "X";
		this.matrix[2][3] = "X";
		this.matrix[3][3] = "X";
		this.matrix[3][2] = "X";
		this.matrix[2][1] = "X";
	}
}