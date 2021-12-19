const schemesDao = require('../dao/SchemesDao');

class SchemesService {
    async getSchemeById(schemeId) {
        const schemeData = await schemesDao.getSchemeById(schemeId);
        return schemeData;
    }

    async getSchemesByType(schemeType, limit = 10, offset = 0) {
        const schemeData = await schemesDao.getSchemesByType(schemeType, limit, offset);
        return schemeData;
    }

    async getSchemesBySubType(schemeSubTypeId, limit = 10, offset = 0) {
        const schemeData = await schemesDao.getSchemesBySubType(schemeSubTypeId, limit, offset);
        return schemeData;
    }
}

module.exports = new SchemesService();