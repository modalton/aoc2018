const fs = require("fs");

const Node = (val, time) => ({ val, time, processing: false, prereqs: [] });

let memoize = [];
let answer = "";
const workers = new Array(5).fill(null);

const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const tick = (workers, cb) => {
  for (let i in workers) {
    if (workers[i]) {
      workers[i].time -= 1;
    }
    if (workers[i] && workers[i].time === 0) {
      cb(workers[i]);
      workers[i] = null;
    }
  }
};

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
        a = Node(pair[0], alphabet.indexOf(pair[0].toLowerCase()) + 1 + 60);
        memoize.push(a);
      }
      if (memoize.find(node => node.val === pair[1])) {
        b = memoize.find(node => node.val === pair[1]);
      } else {
        b = Node(pair[1], alphabet.indexOf(pair[1].toLowerCase()) + 1 + 60);
        memoize.push(b);
      }
      b.prereqs.push(a);
    });
  
  let tick_count = 0;
  while (true) {
    const contenders = memoize
      .filter(node => !node.prereqs.length && !node.processing)
      .sort((a, b) => (a.val > b.val ? -1 : 1));

    for (let i in workers) {
      workers[i] = workers[i] || contenders.pop();
      if (workers[i]) {
        workers[i].processing = true;
      }
    }

    tick(workers, done => {
      memoize = memoize.filter(node => node.val !== done.val);
      memoize.forEach(
        node => (node.prereqs = node.prereqs.filter(n => n.val !== done.val))
      );
      answer += done.val;
    });
    
    tick_count++;
    
    if (!memoize.filter(node => node.time > 0).length) {
      break;
    }
  }

  console.log(answer, tick_count);
});
