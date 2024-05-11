import { parseXandY, readContents, RleStrToArray } from "./logic.mjs";

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
				row.push("b");
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
		let shape = RleStrToArray(contents["data"]);
		console.log(shape);
		this.OverlayShapeToBoard(shape);

		// for(let i=0; i<this.rows; i++){
		// 	for(let j=0; j<this.cols; j++){
		// 	}	
		// }

	}

	OverlayShapeToBoard(shape) {
		this.matrix[1][3] = "o";
		this.matrix[2][3] = "o";
		this.matrix[3][3] = "o";
		this.matrix[3][2] = "o";
		this.matrix[2][1] = "o";
	}
}