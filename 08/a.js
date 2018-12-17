const fs = require("fs");

const all_metadata = [];

const nodeMaker = arr => {
  const num_children = arr.splice(0, 1)[0];
  const num_metadata = arr.splice(0, 1)[0];

  let meta_data = [];
  if (num_children === 0) {
    meta_data = arr.splice(0, num_metadata);
  } else {
    let last = [];
    for (let i = 0; i < num_children; i++) {
      let res = nodeMaker(arr);
      if (i === num_children - 1) {
        last = res;
      }
    }
    meta_data = last.splice(0, num_metadata);
  }
  all_metadata.push(...meta_data);
  return arr;
};

fs.readFile("./input.txt", "utf8", (err, file) => {
  nodeMaker(file.split(" ").map(n => parseInt(n)));
  console.log(all_metadata.reduce((acc, cur) => acc + parseInt(cur), 0));
});
