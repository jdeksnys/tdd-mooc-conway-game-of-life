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
				row += ".";
			}
			res += row + "\n";
		}
		return res;
	}
}