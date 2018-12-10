const fs = require("fs");

const OVERLAP = "overlap";
const matrix = Array.from(new Array(1000), () => new Array(1000).fill(null));

let candidates = [];

fs.readFile("./input.txt", "utf8", (err, file) => {
  const regex = /#([\d]+) @ ([\d]+),([\d]+): ([\d]+)x([\d]+)/;
  const data = file
    .split("\n")
    .filter(line => line.length > 0)
    .forEach(str => {
      const obj = regex.exec(str);
      const [_, id, x_offset, y_offset, width, height] = obj;

      let overlapFlag = false;

      let y = parseInt(y_offset);
      const max_y = parseInt(height) + y;
      for (; y < max_y; y++) {
        let x = parseInt(x_offset);
        const max_x = parseInt(width) + x;
        for (; x < max_x; x++) {
          if (matrix[y][x]) {
            candidates = candidates.filter(el => el !== matrix[y][x]);
            overlapFlag = true;
            matrix[y][x] = OVERLAP;
          } else {
            matrix[y][x] = id;
          }
        }
      }
      if (!overlapFlag) {
        candidates.push(id);
      }
    });
  console.log(candidates[0]);
});
