import Words from '~/class/table/Words';
import Paths from '~/class/table/Paths';
import PathCount from '~/class/table/PathCount';
import WordCount from '~/class/table/WordCount';
import loadIndex from '~/lib/util/loadIndex';
import global from '~/obj/global';

const {
  server,
} = global;

function PathArrayToHash(array) {
  const hash = {};
  array.forEach((e, i) => {
    hash[e.path] = i;
  });
  return hash;
}

function wordArrayToHash(array) {
  const hash = {};
  array.forEach((e, i) => {
    hash[e.word] = i;
  });
  return hash;
}

server.add('/parse/document', async (req, res) => {
  const body = await new Promise((resolve, reject) => {
    req.on('data', (data) => {
      resolve(data.toString());
    });
  });
  const { path, document, } = JSON.parse(body);
  if (global.paths.tb === undefined) {
    global.paths.tb = new Paths();
  }
  const global_paths_tb = global.paths.tb;
  if (global.words.tb === undefined) {
    global.words.tb = new Words();
  }
  const global_words_tb = global.words.tb;
  if (global.pathCount.tb === undefined) {
    global.pathCount.tb = new PathCount();
  }
  let global_path_count_tb = global.pathCount.tb;
  if (global.wordCount.tb === undefined) {
    global.wordCount.tb = new WordCount();
  }
  const global_word_count_tb = global.wordCount.tb;
  if (global.pathCount.val === undefined) {
    global.pathCount.val = await global_path_count_tb.select([0, 0]);
    global.pathCount.val = global.pathCount.val[0].count;
  }
  let global_path_count_val = global.pathCount.val;
  let paths;
  let pathHash;
  if (global_path_count_val !== 0) {
    paths = await global_paths_tb.select([0, global_path_count_val - 1], ['path']);
    pathHash = PathArrayToHash(paths);
  }
  if (global_path_count_val === 0 || pathHash[path] === undefined) {
    await global_paths_tb.insert({ id: global_path_count_val, path, });
  }
  global.pathCount.val += 1;
  global_path_count_val += 1;
  paths = await global_paths_tb.select([0, global_path_count_val - 1], ['path']);
  pathHash = PathArrayToHash(paths);
  await global_path_count_tb.update({ count: global_path_count_val, });
  let words;
  let wordHash;
  if (global.wordCount.val === undefined) {
    global.wordCount.val = await global_word_count_tb.select([0, 0]);
    global.wordCount.val = global.wordCount.val[0].count;
  }
  let global_word_count_val = global.wordCount.val;
  if (global_word_count_val !== 0) {
    words = await global_words_tb.select([0, global_word_count_val - 1], ['word']);
    wordHash = wordArrayToHash(words);
  }
  const terms = document.split(' ');
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i];
    const chars = [];
    for (let j = 0; j < term.length; j += 1) {
      const code = term.charCodeAt(j);
      const char = term.charAt(j);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90)) {
        chars.push(char);
      }
    }
    term = chars.join('').toLowerCase();
    let index;
    if (pathHash !== undefined) {
      index = pathHash[path];
    } else {
      index = 0;
    }
    if (wordHash === undefined || wordHash[term] === undefined) {
      const array = new Array(index + 1);
      array[index] = 1;
      const time = array.map((e) => {
        if (e === '') {
          return 0;
        } else {
          return e;
        }
      }).join(',');
      await global_words_tb.insert({ id: global_word_count_val, word: term, time, });
      await loadIndex();
      global.wordCount.val += 1;
      global_word_count_val += 1;
      await global_word_count_tb.update({ count: global_word_count_val, });
    } else {
      const id = wordHash[term];
      const speech = await global_words_tb.select([id, id], ['time']);
      const array = speech[0].time.split(',');
      if (array[index] === '' || array[index] === undefined) {
        array[index] = 1;
      } else {
        array[index] = parseInt(array[index]) + 1;
      }
      const time = array.map((e) => {
        if (e === '') {
          return 0;
        } else {
          return e;
        }
      }).join(',');
      await global_words_tb.update({ id, word: term, time, });
    }
  }
  res.write(JSON.stringify({ status: 'sucess' }));
  res.end();
});
