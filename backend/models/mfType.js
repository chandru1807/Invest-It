const {
    Model
} = require('objection');
const {
    mfTypeTable
} = require('../configs/constants');

class MfType extends Model {
    static get tableName() {
        return mfTypeTable;
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

module.exports = MfType;