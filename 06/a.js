const fs = require("fs");


const matrix = Array.from(new Array(750), () => new Array(750).fill(null));

const file = fs.readFileSync('./input.txt', 'utf8').split("\n").filter(l => l.length > 0);

const coords = file.map((line,i) => ({x: parseInt(line.split(',')[0]), y: parseInt(line.split(',')[1]), letter : i.toString()}));

const manhattanDistance = (x1,y1,x2,y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const x_max = matrix[0].length - 1;
const y_max = matrix.length - 1;

const total_letters = [];
for(let y = 0; y <= y_max; y++){
  for(let x = 0; x <= x_max; x++){
    let min = [];
    for(let coord of coords){
      if(min.length === 0){ min.push(coord); continue;}
      const coord_dist = manhattanDistance(x,y,coord.x,coord.y);
      const min_dist = manhattanDistance(x,y,min[0].x, min[0].y);
      if(coord_dist < min_dist){min = [coord];}
      if(coord_dist === min_dist){min.push(coord);}
    }
    matrix[y][x] = min.length > 1 ? '.' : total_letters.push(min[0].letter) && min[0].letter;
  }
}

let border_letters = [];
matrix[0].forEach(l => l !== '.' ? border_letters.push(l) : null );
matrix[y_max].forEach(l => l !== '.' ? border_letters.push(l) : null );
matrix.forEach(row => {
  row[0] !== '.' ? border_letters.push(row[0]) : null;
  row[x_max] !== '.' ? border_letters.push(row[x_max]) : null;
})

border_letters = [...new Set(border_letters)];

const count = total_letters.reduce((acc, cur) => {
  return border_letters.includes(cur) ? acc : {...acc, [cur]: cur in acc ? acc[cur]+ 1 : 1};
}, {});

console.log(count);

