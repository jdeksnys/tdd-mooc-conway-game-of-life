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

		let shape_coord_x = board_centre_x - shape_centre_x;
		let shape_coord_y = board_centre_y - shape_centre_y;
		// console.log(shape_centre_x, shape_centre_y);


		for(let i=0; i<shape.length; i++){
			for(let j=0; j<shape[0].length; j++){
				// console.log(shape[i][j]);
			}	
		}

		this.matrix[1][3] = "o";
		this.matrix[2][3] = "o";
		this.matrix[3][3] = "o";
		this.matrix[3][2] = "o";
		this.matrix[2][1] = "o";
	}
}