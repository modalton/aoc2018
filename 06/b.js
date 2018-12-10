const fs = require("fs");


const matrix = Array.from(new Array(750), () => new Array(750).fill(null));

const file = fs.readFileSync('./input.txt', 'utf8').split("\n").filter(l => l.length > 0);

const coords = file.map((line,i) => ({x: parseInt(line.split(',')[0]), y: parseInt(line.split(',')[1]), letter : i.toString()}));

const manhattanDistance = (x1,y1,x2,y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const x_max = matrix[0].length - 1;
const y_max = matrix.length - 1;


for(let y = 0; y <= y_max; y++){
  for(let x = 0; x <= x_max; x++){
    let total = 0;
    for(let coord of coords){
      total +=  manhattanDistance(x,y,coord.x,coord.y);
    }
    matrix[y][x] = total;
  }
}


const count = matrix.reduce((acc,row) => acc + row.reduce((_acc, cur) => cur < 10000 ? _acc + 1 : _acc, 0), 0);

console.log(count)
