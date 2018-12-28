const powerLevel = (x, y, serial) => {
  const rack_id = x + 10;
  let power = rack_id * y;
  power += serial;
  power = power * rack_id;
  power = parseInt(power.toString().split("").reverse()[2]) || 0;
  power -= 5;
  return power;
};

const cellPowerLevel = (x_start,y_start,matrix, size) => {
  let total_power = 0;
  for(let y = 0; y < size; y++){
    for(let x = 0; x < size; x++){
      total_power += matrix[y_start + y][x_start + x];
    }
  }
  return total_power;
}

const matrix = Array.from(new Array(300), x => new Array(300).fill(null));
const serial = 1718;

for(let y = 1; y < matrix.length - 3; y++){
  for(let x = 1; x < matrix[0].length - 3; x++){
    matrix[y][x] = powerLevel(x,y,serial);
  }
}


const grid_powers = [];

for(let y = 1; y < matrix.length - 3; y++){
  for(let x = 1; x < matrix[0].length - 3; x++){
    const limiting_side = Math.min(matrix.length - y, matrix[0].length - x);
    for(let z = 1; z < limiting_side; z++){
      grid_powers.push({power:cellPowerLevel(x,y,matrix,z), x, y, z});
    }
  }
}



grid_powers.sort((a,b) => b.power - a.power);
console.log(grid_powers[0]);


