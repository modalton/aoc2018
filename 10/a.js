const fs = require("fs");

const turn = (matrix, point) => {
  point.pos_x += point.vel_x;
  point.pos_y += point.vel_y;
};

const re = new RegExp(
  /[a-z<= ]+(-?\d+)[, ]+(-?\d+)[a-z><= ]+(-?\d+)[ ,]+(-?\d+)/
);

const points = [];

const height = 75;
const width = 175;
const matrix = Array.from(new Array(height), x => new Array(width).fill("."));

fs.readFile("./input.txt", "utf8", (err, file) => {
  file
    .split("\n")
    .filter(l => l.length > 0)
    .forEach(line => {
      const [_, pos_x, pos_y, vel_x, vel_y] = re.exec(line);
      const point = {
        pos_x: parseInt(pos_x) - 50,
        pos_y: parseInt(pos_y) - 75,
        vel_x: parseInt(vel_x),
        vel_y: parseInt(vel_y)
      };
      points.push(point);
    });

  for (let i = 0; i < 10511; i++) {
    points.forEach(p => turn(matrix, p));
  }
  points.forEach(p => {
    if (p.pos_y < height && p.pos_y >= 0 && p.pos_x < width && p.pos_x >= 0) {
      matrix[p.pos_y][p.pos_x] = "#";
    }
  });
  console.log("+------------------------+");
  matrix.forEach(row => console.log(row.join("")));
});


// Some code helping pin down time/space of message
// let i = 0;
// setInterval(() => {
//   i++;
//   points.forEach(p => turn(matrix, p));
//   points.forEach(p => {
//     if (p.pos_y < height && p.pos_y >= 0 && p.pos_x < width && p.pos_x >= 0) {
//       matrix[p.pos_y][p.pos_x] = "#";
//     }
//   });
//   const contains_flag =
//     matrix.reduce(
//       (acc, row) => (acc += row.includes("#") ? 1 : 0),
//       false,
//       0
//     ) > 7;

//   if (contains_flag) {
// console.log("+------------------------+", i);
// matrix.forEach(row => console.log(row.join("")));
//   }
//   matrix.forEach(row => row.fill("."));
// }, 100);
