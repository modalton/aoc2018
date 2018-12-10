const fs = require("fs");

const OVERLAP = "overlap";
const matrix = Array.from(new Array(1000), () => new Array(1000).fill(null));

fs.readFile("./input.txt", "utf8", (err, file) => {
  const regex = /#([\d]+) @ ([\d]+),([\d]+): ([\d]+)x([\d]+)/;
  const data = file
    .split("\n")
    .filter(line => line.length > 0)
    .forEach(str => {
      const [_, id, x_offset, y_offset, width, height] = regex.exec(str);
      let y = parseInt(y_offset);
      const max_y = parseInt(height) + y;
      for (; y < max_y; y++) {
        let x = parseInt(x_offset);
        const max_x = parseInt(width) + x;
        for (; x < max_x; x++) {
          matrix[y][x] = matrix[y][x] ? OVERLAP : true;
        }
      }
    });

  console.log(
    matrix.reduce(
      (acc, row) =>
        acc + row.reduce((ac, el) => (el === OVERLAP ? ac + 1 : ac), 0),
      0
    )
  );
});
