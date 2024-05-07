import Table from 'deposit.js';
import mysqlOptions from '~/obj/mysqlOptions';

class PathCount extends Table {
  constructor() {
    super('path_count', mysqlOptions);
  }
}

export default PathCount;
