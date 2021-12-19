const { Model } = require('objection');
const { listTable } = require('../configs/constants');

class ListTable extends Model {
  static get tableName() {
    return listTable;
  }
}

module.exports = ListTable;