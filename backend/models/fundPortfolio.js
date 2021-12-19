const {
  Model
} = require('objection');
const {
  fundPortfolioTable
} = require('../configs/constants');

class FundPortfolio extends Model {
  static get tableName() {
    return fundPortfolioTable;
  }

  static get relationMappings() {
    const Schemes = require('./schemes');
    return {
      schemes: {
        relation: Model.HasOneRelation,
        modelClass: Schemes,
        join: {
          from: 'fund_portfolio.schemeId', //here
          to: 'mf_schemes.id'
        }
      }
    }
  }
}

module.exports = FundPortfolio;