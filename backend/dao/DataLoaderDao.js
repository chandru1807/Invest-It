const FundPortfolio = require('../models/fundPortfolio');
const ListTable = require('../models/listTable');
const MfSchemes = require('../models/schemes');
const MfTypes = require('../models/mfType');
const MfSubTypes = require('../models/mfSubType');

class DataLoaderDao {
    async checkIfListExists() {
        const mfList = await ListTable.query();
        //console.log('in check list dao',mfList);
        return mfList;
    }

    async saveList(mfList) {
        const result = await ListTable.query().insert({ //here
            listData: mfList
        })
        return result;
    }

    async saveMfSchemes(schemes) {
        const saveResult = await MfSchemes.query().insert(schemes).onConflict('code').merge();
        return saveResult;
    }

    async saveFundPortfolio(fundPortfolio) {
        console.log(fundPortfolio);
        const fundResult = await FundPortfolio.query().insert(fundPortfolio);
        return fundResult;
    }

    async saveMfTypes(mfTypes) {
        // console.log(mfTypes);
        const typesResult = await MfTypes.query().insert(mfTypes);
        return typesResult;
    }

    async saveMfSubTypes(mfSubTypes) {
        // console.log(mfTypes);
        const subtypesResult = await MfSubTypes.query().insert(mfSubTypes);
        return subtypesResult;
    }
}

module.exports = new DataLoaderDao();