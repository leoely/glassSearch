import Table from 'deposit.js';
import mysqlOptions from '~/obj/mysqlOptions';

class Words extends Table {
  constructor() {
    super('words', mysqlOptions);
  }
}

export default Words;
