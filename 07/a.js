const fs = require("fs");

const Node = val => ({ val, prereqs: [] });

let memoize = [];
let answer = "";

fs.readFile("./input.txt", "utf8", (err, file) => {
  file
    .split("\n")
    .filter(l => l.length > 0)
    .map(l => l.split(" ").filter(w => w.length === 1))
    .forEach(pair => {
      let a, b;
      if (memoize.find(node => node.val === pair[0])) {
        a = memoize.find(node => node.val === pair[0]);
      } else {
        a = Node(pair[0]);
        memoize.push(a);
      }
      if (memoize.find(node => node.val === pair[1])) {
        b = memoize.find(node => node.val === pair[1]);
      } else {
        b = Node(pair[1]);
        memoize.push(b);
      }
      b.prereqs.push(a);
    });

  for (let i = 0; i < 26; i++) {
    const smallest = memoize
      .filter(node => !node.prereqs.length)
      .sort((a, b) => (a.val < b.val ? -1 : 1))[0];
    answer += smallest.val;

    memoize = memoize.filter(node => node.val !== smallest.val);
    memoize.forEach(
      node => (node.prereqs = node.prereqs.filter(n => n.val !== smallest.val))
    );
  }
  console.log(answer);
});
