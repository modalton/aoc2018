const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, file) => {
  const guards = {};
  const unsorted_items = [];
  const regex = /\[\d+-(\d+)-(\d+) (\d+):(\d+)] ([a-z ]+|Guard #(\d+))/;
  const data = file
    .split("\n")
    .filter(line => line.length > 0)
    .forEach(str => {
      const [ss, month, day, hour, minute, action, guard_id] = regex.exec(str);
      const timestamp = new Date(2018, month, day, hour, minute,);

      unsorted_items.push({ ss,guard_id, timestamp, action });
    });

  const sorted = unsorted_items.sort((a, b) => a.timestamp - b.timestamp);
  
  let cur_guard, start_sleep_time;
  sorted.forEach(({action, timestamp, guard_id}) => {
    if (action === "falls asleep") {
      start_sleep_time = timestamp;
    } else if (action === "wakes up") {
      const time_asleep =
        timestamp.getMinutes() - start_sleep_time.getMinutes();
      guards[cur_guard].sleep_cycles.push({
        mins_asleep: Array.from(
          { length: time_asleep },
          (_, i) => i + start_sleep_time.getMinutes()
        ),
        time_asleep
      });
    } else {
      cur_guard = guard_id;
      if (!(guard_id in guards)) {
        guards[guard_id] = {
          sleep_cycles: []
        };
      }
    }
  });

  // Sum guard total sleep time
  Object.keys(guards).forEach(
    k =>
      (guards[k]["total_time_asleep"] = guards[k].sleep_cycles.reduce(
        (acc, cur) => acc + cur.time_asleep,
        0
      ))
  );

  // Find guard sleepiest min
  Object.keys(guards).forEach(k => {
    const minute_count = guards[k].sleep_cycles
      .reduce((acc, cur) => [...acc, ...cur.mins_asleep], [])
      .reduce(
        (acc, num) =>
          num in acc ? { ...acc, [num]: acc[num] + 1 } : { ...acc, [num]: 1 },
        {}
      );
    let max_minute;
    for (let key in minute_count) {
      if (!max_minute || minute_count[key] > minute_count[max_minute]) {
        max_minute = key;
      }
    }
    guards[k]["sleepiest_min"] = max_minute;
  });

  const sleepy_id = Object.keys(guards).reduce(
    (acc, k) =>
      guards[k].total_time_asleep > guards[acc].total_time_asleep ? k : acc
  );
  const sleepiest_min = guards[sleepy_id].sleepiest_min;

  console.log("winner", sleepy_id, sleepiest_min);
  console.log(sleepy_id * sleepiest_min);
});
