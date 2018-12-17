const fs = require("fs");

const nodeMaker = arr => {
  const num_children = arr.splice(0, 1)[0];
  const num_metadata = arr.splice(0, 1)[0];

  let meta_data = [];
  let value = 0;
  let child_values = [];
  if (num_children === 0) {
    meta_data = arr.splice(0, num_metadata);
    value = meta_data.reduce((acc, cur) => acc + cur, 0);
  } else {
    let last = [];
    for (let i = 0; i < num_children; i++) {
      let [child_val, rest] = nodeMaker(arr);
      if (i === num_children - 1) {
        last = rest;
      }
      child_values.push(child_val);
    }
    meta_data = last.splice(0, num_metadata);
    meta_data.forEach(md => {
      if (md && md <= child_values.length) {
        value += child_values[md - 1];
      }
    });
  }
  return [value, arr];
};

fs.readFile("./input.txt", "utf8", (err, file) => {
  console.log(nodeMaker(file.split(" ").map(n => parseInt(n))));
});
