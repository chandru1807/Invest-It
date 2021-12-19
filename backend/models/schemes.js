const {
  Model
} = require('objection');
const {
  schemesTable
} = require('../configs/constants');

class MfSchemes extends Model {
  static get tableName() {
    return schemesTable;
  }

  static get relationMappings() {
    const FundPortfolio = require('./fundPortfolio');
    const MfTypes = require('./mfType');
    const MfSubTypes = require('./mfSubType');
    return {
      schemes: {
        relation: Model.HasManyRelation,
        modelClass: FundPortfolio,
        join: {
          from: 'mf_schemes.id',
          to: 'fund_portfolio.schemeId' //here
        }
      },
      mfTypes: {
        relation: Model.HasOneRelation,
        modelClass: MfTypes,
        filter: query => query.select('id', 'fundType'), //here
        join: {
          from: 'mf_schemes.fundTypeId', //here
          to: 'mf_type.id'
        }
      },
      mfSubTypes: {
        relation: Model.HasOneRelation,
        modelClass: MfSubTypes,
        filter: query => query.select('id', 'fundSubtype'), //here
        join: {
          from: 'mf_schemes.fundSubtypeId', //here
          to: 'mf_subtype.id'
        }
      },
    }
  }
}

module.exports = MfSchemes;