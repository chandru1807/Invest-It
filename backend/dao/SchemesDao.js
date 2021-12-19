const MfSchemes = require('../models/schemes');

class SchemesDao {
    async getSchemeById(schemeId) {
        const schemeData = await MfSchemes.query().findById(schemeId).withGraphFetched('schemes').withGraphFetched('mfTypes').withGraphFetched('mfSubTypes');
        return schemeData;
    }

    // async getSchemesByType(schemeType, limit, offset) {
    //     const schemeData = await MfSchemes.query().where({
    //         category: schemeType
    //     }).offset(offset).limit(parseInt(limit) + 1);
    //     return schemeData;
    // }
    async getSchemesByType(schemeType, limit, offset) {
        const schemeData = await MfSchemes.query().where({
            category: schemeType
        }).offset(offset).limit(parseInt(limit) + 1).withGraphFetched('mfTypes').withGraphFetched('mfSubTypes').select('id', 'name', 'returns');
        return schemeData;
    }

    async getSchemesBySubType(schemeSubTypeId, limit, offset) { //here
        const schemeData = await MfSchemes.query().where({
            fundSubtypeId: schemeSubTypeId
        }).offset(offset).limit(parseInt(limit) + 1).withGraphFetched('mfTypes').withGraphFetched('mfSubTypes').select('id', 'name', 'returns')
        return schemeData;
    }
}

module.exports = new SchemesDao();