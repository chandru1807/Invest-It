const mutualFundsService = require('../service/MutualFundsService')

class MutualFundsController {
    async getAllFundTypes(req, res) {
        const mutualFundTypes = await mutualFundsService.getAllFundTypes();
        res.send(mutualFundTypes);
    }

    async getAllTypesWithSubTypes(req, res) {
        const mutualFundTypesWithSubtypes = await mutualFundsService.getAllTypesWithSubTypes();
        res.send(mutualFundTypesWithSubtypes);
    }

    async getSchemesBySubType(req, res) {
        const schemeTypeId = req.params.subtypeid;
        const limit = req.query.limit;
        const offset = req.query.offset;
        const schemeData = await mutualFundsService.getSchemesBySubType(schemeTypeId, limit, offset);
        res.send(schemeData);
    }
}

module.exports = new MutualFundsController();