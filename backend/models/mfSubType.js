const {
    Model
} = require('objection');
const {
    mfSubTypeTable
} = require('../configs/constants');

class MfSubType extends Model {
    static get tableName() {
        return mfSubTypeTable;
    }

    //   static get relationMappings() {
    //     const Schemes = require('./schemes');
    //     return {
    //         schemes: {
    //           relation: Model.HasOneRelation,
    //           modelClass: Schemes,
    //           join: {
    //             from: 'fund_portfolio.scheme_id',
    //             to: 'mf_schemes.id'
    //           }
    //         },
    //     }
    //   }
}

module.exports = MfSubType;