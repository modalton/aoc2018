const node = (val, next, prev) =>({val,next, prev});

class Ring {
  constructor(){
    const seed = node(0);
    seed.next = seed;
    seed.prev = seed;
    this.ll = seed;
    this.head = seed;
    this.print_head = this.head;
    this.num_count = 0;
  }

  turn(){
    const next_num = this.num_count++;
    if(next_num % 23 === 0){
      const eight_behind = this._getNodeNCCW(this.head, 8);
      const seven_behind = eight_behind.next;
      const six_behind = seven_behind.next;

      eight_behind.next = six_behind;
      six_behind.prev = eight_behind;
      this.head = six_behind;
      return next_num + seven_behind.val;
    }else{
      const one_away = this.head.next;
      const two_away = one_away.next;
      const new_node = node(next_num, two_away, one_away);
      
      one_away.next = new_node;
      two_away.prev = new_node;
      this.head = new_node;
          }
  }

  _getNodeNCCW(node, n){
    let itr = node;
    for(let i = 0 ; i < n; i++){
      itr = itr.prev;
    }
    return itr;
  }
  
} 

const r = new Ring();
const player_count = 423;
const marble_count = 71944;
const players = new Array(player_count).fill(0);

for(let j = 0; j < marble_count * 100 ; j++){
  const score = r.turn();
  if(score){
    players[j % player_count] += score;
  }
}

console.log(Math.max(...players))


