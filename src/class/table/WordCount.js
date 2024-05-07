import Table from 'deposit.js';
import mysqlOptions from '~/obj/mysqlOptions';

class WordCount extends Table {
  constructor() {
    super('word_count', mysqlOptions);
  }
}

export default WordCount;
