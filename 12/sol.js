// Easier to make w/ macro then file
const initial_state = `##.#...#.#.#....###.#.#....##.#...##.##.###..#.##.###..####.#..##..#.##..#.......####.#.#..#....##.#`;

const ops = {
  "#.#.#" : '#',
  "..#.#" : '.',
  ".#.##" : '#',
  ".##.." : '.',
  "##..." : '#',
  "##..#" : '#',
  "#.##." : '#',
  ".#..#" : '#',
  ".####" : '.',
  "....#" : '.',
  "#...." : '.',
  "#.###" : '.',
  "###.#" : '#',
  ".#.#." : '.',
  "#...#" : '.',
  ".#..." : '#',
  "##.#." : '#',
  "#..##" : '#',
  "..##." : '.',
  "####." : '#',
  ".###." : '.',
  "#####" : '.',
  "#.#.." : '.',
  "...#." : '.',
  "..#.." : '.',
  "###.." : '#',
  "#..#." : '.',
  ".##.#" : '.',
  "....." : '.',
  "##.##" : '#',
  "..###" : '#',
  "...##" : '#',
}


const getNextValue = str => ops[str] || '.';

const getFiveNeighbors = (idx, arr) => {
  if(idx < 3){
    return [...arr.slice(arr.length - (2 - idx)), ...arr.slice(0,idx + 3)];
  } else if (idx > arr.length - 3){
    return [...arr.slice(idx - 2), ...arr.slice(0, (2 - (arr.length - idx)) + 1)];
  } else {
    return arr.slice(idx - 2, idx + 3);
  }
}

let state = '.' + initial_state + '........................................................................................................';

let stable_value;
for(let i = 0; i < 100; i++){

  let next_state = '';
  for(let j in state){
    const n = getFiveNeighbors(parseInt(j),state.split('')).join('');
    next_state += getNextValue(n);
  }
  state = next_state
  if(i == 89 || i == 19){
    const value = state.split('').reduce((acc,cur, i) => cur === '#' ? acc + i - 1 : acc, 0);
    stable_value = value
    console.log(i,value)
  }
}

const gens = 50000000000;
console.log('stable val', stable_value)
console.log(((gens - 89 - 1) * 50) + stable_value)
