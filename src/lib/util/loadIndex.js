import Words from '~/class/table/Words';
import Paths from '~/class/table/Paths';
import PathCount from '~/class/table/PathCount';
import WordCount from '~/class/table/WordCount';
import global from '~/obj/global';

const {
  server,
} = global;

function radixSort(list) {
  list = list.map((e) => [e[0], e]);
  const bucket = new Array(10);
  while (true) {
    for (let i = 0; i < bucket.length; i += 1) {
      bucket[i] = undefined;
    }
    let flag = 0;
    list.forEach((e, i) => {
      const [s] = e;
      const m = s % 10;
      if (bucket[m] === undefined) {
        bucket[m] = [];
      }
      bucket[m].unshift(i);
      const r = parseInt(s / 10);
      if (r !== 0) {
        flag += 1;
      }
      list[i][0] = r;
    });
    if (flag === 0) {
      break;
    }
    const newList = [];
    for (let i = 0; i < bucket.length; i += 1) {
      const groove = bucket[i];
      if (Array.isArray(groove)) {
        groove.forEach((e) => {
          newList.unshift(list[e]);
        });
      }
    }
    list = newList;
  }
  const ans = [];
  for (let i = 0; i < bucket.length; i += 1) {
    const groove = bucket[i];
    if (Array.isArray(groove)) {
      groove.forEach((e) => {
        ans.unshift(list[e][1]);
      });
    }
  }
  return ans;
}

export default async function loadIndex() {
  if (global.words.tb === undefined) {
    global.words.tb = new Words();
  }
  const global_words_tb = global.words.tb;
  if (global.paths.tb === undefined) {
    global.paths.tb = new Paths();
  }
  const global_paths_tb = global.paths.tb;
  if (global.wordCount.tb === undefined) {
    global.wordCount.tb = new WordCount();
  }
  const global_word_count_tb = global.wordCount.tb;
  if (global.wordCount.val === undefined) {
    global.wordCount.val = await global_word_count_tb.select([0, 0]);
    global.wordCount.val = global.wordCount.val[0].count;
  }
  let global_word_count_val = global.wordCount.val;
  if (global_word_count_val !== 0) {
    const words = await global_words_tb.select([0, global_word_count_val - 1], ['word'])
    words.forEach((e, i) => {
      const { time, word, } = e;
      try {
        server.match(`/word/${word}`);
      } catch (e) {
        server.add(`/word/${word}`, async (req, res) => {
          const words = await global_words_tb.select([i, i], ['time'])
          const timeString = words[0].time;
          let time = timeString.split(',').map((e, i) => [parseInt(e), i]);
          time = radixSort(time);
          time = time.filter((e) => {
            const [count] = e;
            return count !== 0;
          });
          const routes = [];
          for (let i = 0; i < time.length; i += 1) {
            const t = time[i][1];
            const paths = await global_paths_tb.select([t, t], ['path']);
            routes[i] = [paths[0].path, time[i][0]];
          }
          res.write(JSON.stringify(routes));
          res.end();
        });
      }
    });
  }
}
