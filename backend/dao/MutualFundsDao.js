const MfType = require('../models/mfType');
const MfSubType = require('../models/mfSubType');

class MutualFundsDao {
    async getAllFundTypes() {
        const mfFundTypes = await MfType.query().orderBy('fundType', 'ASC'); //here
        return mfFundTypes;
    }

    async getAllFundSubTypes() {
        const mfFundSubTypes = await MfSubType.query().orderBy('fundSubtype', 'ASC'); //here
        return mfFundSubTypes;
    }
}

module.exports = new MutualFundsDao();