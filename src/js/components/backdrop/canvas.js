const ctx = this.context;
const lineWidth = 2;
const lineColor = '#111111';
const lineOpacity = 0.5;
const diamondColor = '#222222';
const diamonOpacity = 1;

const panelSize = {
	y: 200,
	x: 150
}

this.canvasHeight = this.offsetHeight;
this.canvasWidth = this.offsetWidth;

let height = this.canvasHeight;
let width = this.canvasWidth;

class Line {

	constructor(x, y, strokeWidth) {

	}

}

class VerticalLine extends Line {

	constructor(...args) {
		super(...args);
		this.height = height;
	}

}

class HorizontalLine extends Line {

	constructor(...args) {
		super(...args);
		this.width = width;
	}
	
}