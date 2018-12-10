const fs = require("fs");

const reductionPass = str => {
  let new_str = '';
  let a,b;
  for(a=0, b=1; a <= str.length-1 ; a++,b++){
    if(b < str.length-1 && str[b].toLowerCase() === str[a].toLowerCase() && str[a] !== str[b]){
      a++;
      b++;
      continue;
    }
    new_str+= str[a];
  }
  return new_str;
}

const minReduction = str => {
  let prev_len = -1;
  while(true){
    str = reductionPass(str);
    if(str.length == prev_len){break;}
    prev_len = str.length;
  }
  return str;
}

fs.readFile("./input.txt", "utf8", (err, file) => {
  let polymer = file.trim();

  // Part A
  // console.log(minReduction(polymer).length);

  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const solution = alphabet.reduce((min, letter) => {
    const re = new RegExp(letter,"gi");
    const new_polymer = polymer.replace(re,'');
    const new_reduction = minReduction(new_polymer);
    return new_reduction.length < min ? new_reduction.length :  min;
  }, Infinity);
  console.log(solution);
});
