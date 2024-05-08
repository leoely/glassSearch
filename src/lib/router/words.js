import Words from '~/class/table/Words';
import Paths from '~/class/table/Paths';
import PathCount from '~/class/table/PathCount';
import WordCount from '~/class/table/WordCount';
import global from '~/obj/global';

const {
  server,
} = global;

async function loadIndex() {
  if (global.words.tb === undefined) {
    global.words.tb = new Words();
  }
  const global_words_tb = global.words.tb;
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
    const words = await global_words_tb.select([0, global_word_count_val - 1], ['time', 'word'])
    words.forEach((e, i) => {
      const { time, word, } = e;
      server.add(`/word/${word}`, async (req, res) => {
        res.write(JSON.stringify(time));
        res.end();
      });
    });
  }
}
loadIndex();
