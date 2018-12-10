const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, file) => {
  const regex = /#([\d]+) @ ([\d]+),([\d]+): ([\d]+)x([\d]+)/;
  const data = file.split('\n').filter(line => line.length > 0).map(str => {
    const obj = regex.exec(str);
    const [_, id, x_offset, y_offset, width, height] = obj;
    return `'(${id} ${x_offset} ${y_offset} ${width} ${height})`;
  }).join('\n');
  fs.writeFile('./lispy_input.txt', data, (err) => {
    if (err) throw err;
    console.log('lispy_input.txt saved');
  });
})
