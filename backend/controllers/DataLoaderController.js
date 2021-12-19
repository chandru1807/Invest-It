const axios = require('axios');
const {
    listApi
} = require('../configs/constants')
const dataLoaderService = require('../service/DataLoaderService')

class DataLoader {
    async fetchMfList(req, res) {
        let mfList = {};
        mfList = await dataLoaderService.checkIfListExists();
        if (!mfList) {
            const listResult = await axios.get(listApi);
            mfList = listResult.data;
            const returnVal = await dataLoaderService.saveList(listResult.data);
            //console.log('inside controller mf null', returnVal)
        }
        const mfCodes = await dataLoaderService.processMfListData(mfList || {});
        res.send(mfCodes);
    }

    async getCodes(req, res) {
        let mfList = {};
        mfList = await dataLoaderService.checkIfListExists();
        if (!mfList) {
            const listResult = await axios.get(listApi);
            mfList = listResult.data;
            const returnVal = await dataLoaderService.saveList(listResult.data);
            //console.log('inside controller mf null', returnVal)
        }
        const mfCodes = dataLoaderService.getCodes(mfList || {});
        res.send(mfCodes);
    }
}

module.exports = new DataLoader();