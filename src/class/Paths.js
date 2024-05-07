import Table from 'deposit.js';
import mysqlOptions from '~/obj/mysqlOptions';

class Paths extends Table {
  constructor() {
    super('paths', mysqlOptions);
  }
}

export default Paths;
