import Table from 'deposit.js';
import mysqlOptions from '~/obj/mysqlOptions';

class Docuemts extends Table {
  constructor() {
    super('docuemts', mysqlOptions);
  }
}

export default Docuemts;
