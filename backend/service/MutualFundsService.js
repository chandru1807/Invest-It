const mutualFundsDao = require('../dao/MutualFundsDao');

const schemesService = require('../service/SchemesService');

class MutualFundsService {
    async getAllFundTypes() {
        const mutualFundTypes = await mutualFundsDao.getAllFundTypes();
        return mutualFundTypes;
    }

    async getAllFundSubTypes() {
        const mutualFundSubTypes = await mutualFundsDao.getAllFundSubTypes();
        return mutualFundSubTypes;
    }

    async getAllTypesWithSubTypes() {
        const mutualFundTypes = await mutualFundsDao.getAllFundTypes();
        const mutualFundSubTypes = await mutualFundsDao.getAllFundSubTypes();
        return {
            'fundTypes': mutualFundTypes,
            'fundSubTypes': mutualFundSubTypes
        };
    }

    async getSchemesBySubType(schemeSubTypeId, limit, offset) {
        const mutualFundSchemesBySubtype = await schemesService.getSchemesBySubType(schemeSubTypeId, limit, offset);
        return mutualFundSchemesBySubtype;
    }
}

module.exports = new MutualFundsService();